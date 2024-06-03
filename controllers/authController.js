const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail } = require('../utils/email');
const { validateSignupData, validateLoginData } = require('../utils/validate');

exports.signup = async (req, res) => {
    const { error } = validateSignupData(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { username, email, password, phone, country, firstName, lastName, postCode } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).send({ message: 'Email already exists' });

        user = new User({ username, email, password, phone, country, firstName, lastName, postCode });
        await user.save();

        sendVerificationEmail(user.email, user._id);

        res.status(201).send({ message: 'User registered. Check your email to verify the account.' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { error } = validateLoginData(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: 'Invalid email or password' });

        if (!user.isVerified) return res.status(400).send({ message: 'Please verify your email to login' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send({ message: 'Invalid link' });

        user.isVerified = true;
        await user.save();

        res.send({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    phone: Joi.string().required(),
    country: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    postCode: Joi.string().required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

exports.validateSignupData = (data) => signupSchema.validate(data);
exports.validateLoginData = (data) => loginSchema.validate(data);

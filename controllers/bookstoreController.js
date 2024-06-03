const Bookstore = require('../models/Bookstore');
const axios = require('axios');

exports.getAllBookstores = async (req, res) => {
    try {
        const bookstores = await Bookstore.find();
        res.send(bookstores);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.searchBookstores = async (req, res) => {
    const { name } = req.query;
    try {
        const bookstores = await Bookstore.find({ name: new RegExp(name, 'i') });
        res.send(bookstores);
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

// exports.nearbyBookstores = async (req, res) => {
//     const { postcode } = req.query;
//     try {
//         const { data } = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
//         const { latitude, longitude } = data.result;

//         const bookstores = await Bookstore.find({
//             location: {
//                 $near: {
//                     $geometry: { type: 'Point', coordinates: [longitude, latitude] },
//                     $maxDistance: 2000
//                 }
//             }
//         });

//         res.send(bookstores);
//     } catch (error) {
//         res.status(500).send({ message: 'Server error' });
//     }
// };


exports.searchNearbyBookstores = async (req, res) => {
    const { postcode, latitude, longitude } = req.query;

    try {
        let lat, lon;

        if (postcode) {
            const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
            lat = response.data.result.latitude;
            lon = response.data.result.longitude;
        } else if (latitude && longitude) {
            lat = parseFloat(latitude);
            lon = parseFloat(longitude);
        } else {
            return res.status(400).json({ message: 'Please provide either a postcode or latitude and longitude.' });
        }

        const bookstores = await Bookstore.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [lon, lat] },
                    $maxDistance: 2000
                }
            }
        });

        res.status(200).json({ bookstores });
    } catch (error) {
        console.error('Error finding nearby bookstores:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.insertBookstores = async (req, res) => {
    const { bookstores } = req.body;
    try {
        console.log('dataa1')
        for (const bookstore of bookstores) {
            await Bookstore.create({
                name: bookstore.name,
                city: bookstore.city,
                location: {
                    type: 'Point',
                    coordinates: bookstore.location.coordinates
                }
            });
            console.log(`Inserted ${bookstore.name}`);
        }
        console.log('dataa22')

        res.status(200).json({ message: 'Bookstores inserted successfully' });
    } catch (error) {
        console.error('Error inserting bookstores:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

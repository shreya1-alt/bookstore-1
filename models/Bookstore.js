const mongoose = require('mongoose');

const bookstoreSchema = new mongoose.Schema({
    name: String,
    city: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

bookstoreSchema.index({ location: '2dsphere' });

const Bookstore = mongoose.model('Bookstore', bookstoreSchema);
module.exports = Bookstore;

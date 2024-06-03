const mongoose = require('mongoose');
const Bookstore = require('../models/Bookstore');
require('dotenv').config();

const bookstoreData = [
    {
        "name": "The Book Nook",
        "city": "New York",
        "location": {
            "type": "Point",
            "coordinates": [-74.005973, 40.712776]
        }
    },
    {
        "name": "Readers' Haven",
        "city": "Los Angeles",
        "location": {
            "type": "Point",
            "coordinates": [-118.243685, 34.052235]
        }
    },
    {
        "name": "Page Turners",
        "city": "Chicago",
        "location": {
            "type": "Point",
            "coordinates": [-87.629799, 41.878113]
        }
    },
    {
        "name": "Literary Loft",
        "city": "Houston",
        "location": {
            "type": "Point",
            "coordinates": [-95.369804, 29.760427]
        }
    },
    {
        "name": "Novel Idea",
        "city": "Phoenix",
        "location": {
            "type": "Point",
            "coordinates": [-112.074036, 33.448376]
        }
    },
    {
        "name": "Book Haven",
        "city": "Philadelphia",
        "location": {
            "type": "Point",
            "coordinates": [-75.165222, 39.952583]
        }
    },
    {
        "name": "Story Corner",
        "city": "San Antonio",
        "location": {
            "type": "Point",
            "coordinates": [-98.493629, 29.424122]
        }
    },
    {
        "name": "Bibliophile's Retreat",
        "city": "San Diego",
        "location": {
            "type": "Point",
            "coordinates": [-117.161087, 32.715736]
        }
    },
    {
        "name": "Epic Reads",
        "city": "Dallas",
        "location": {
            "type": "Point",
            "coordinates": [-96.7970, 32.7767]
        }
    },
    {
        "name": "Page by Page",
        "city": "San Jose",
        "location": {
            "type": "Point",
            "coordinates": [-121.8863, 37.3382]
        }
    },
    {
        "name": "The Book Worm",
        "city": "Austin",
        "location": {
            "type": "Point",
            "coordinates": [-97.7431, 30.2672]
        }
    },
    {
        "name": "Fictional Escape",
        "city": "Jacksonville",
        "location": {
            "type": "Point",
            "coordinates": [-81.6557, 30.3322]
        }
    },
    {
        "name": "Tome Travels",
        "city": "Fort Worth",
        "location": {
            "type": "Point",
            "coordinates": [-97.3308, 32.7555]
        }
    },
    {
        "name": "Chapter One",
        "city": "Columbus",
        "location": {
            "type": "Point",
            "coordinates": [-82.9988, 39.9612]
        }
    },
    {
        "name": "Infinite Pages",
        "city": "Charlotte",
        "location": {
            "type": "Point",
            "coordinates": [-80.8431, 35.2271]
        }
    },
    {
        "name": "Bound Words",
        "city": "San Francisco",
        "location": {
            "type": "Point",
            "coordinates": [-122.4194, 37.7749]
        }
    },
    {
        "name": "Book Oasis",
        "city": "Indianapolis",
        "location": {
            "type": "Point",
            "coordinates": [-86.1581, 39.7684]
        }
    },
    {
        "name": "Bookworm's Corner",
        "city": "Seattle",
        "location": {
            "type": "Point",
            "coordinates": [-122.3321, 47.6062]
        }
    },
    {
        "name": "Literary Legends",
        "city": "Denver",
        "location": {
            "type": "Point",
            "coordinates": [-104.9903, 39.7392]
        }
    },
    {
        "name": "Story Time",
        "city": "Washington",
        "location": {
            "type": "Point",
            "coordinates": [-77.0369, 38.9072]
        }
    }
]


mongoose.connect('mongodb://0.0.0.0:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        return Bookstore.insertMany(bookstoreData);
    })
    .then(() => {
        console.log('Bookstores inserted');
        mongoose.disconnect();
    })
    .catch(err => console.log(err));

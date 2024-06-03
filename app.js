require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const path = require('path');



// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const bookstoreRoutes = require('./routes/bookstoreRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookstores', bookstoreRoutes);

// Connect to MongoDB

mongoose.connect('mongodb://0.0.0.0:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

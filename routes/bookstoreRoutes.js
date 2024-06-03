const express = require('express');
const router = express.Router();
const { getAllBookstores, searchBookstores, searchNearbyBookstores, insertBookstores } = require('../controllers/bookstoreController');
// const auth = require('../middleware/auth');

router.get('/', getAllBookstores);
router.get('/search', searchBookstores);
router.get('/nearby', searchNearbyBookstores);
router.post('/createBook', insertBookstores);

module.exports = router;

const router = require('express').Router();
const ratingController = require('../controllers/ratingController');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken');

// POST request to add a rating
router.post("/", verifyTokenAndAuthorization,ratingController.addRating);

// GET request to fetch random categories
router.get("/", verifyTokenAndAuthorization,ratingController.checkUserRating);

module.exports = router;

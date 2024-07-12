const router = require('express').Router();
const orderController = require('../controllers/orderController');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken');

// POST request to add a rating
router.post("/",verifyTokenAndAuthorization,orderController.placeOrder);

// GET request to fetch random categories
router.get("",verifyTokenAndAuthorization,orderController.getUserOrders);


module.exports = router;

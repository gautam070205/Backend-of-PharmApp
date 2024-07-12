const router = require('express').Router();
const cartController = require('../controllers/cartController');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken');

// POST request to add a rating
router.post("/",verifyTokenAndAuthorization,cartController.addProductToCart);

// GET request to fetch random categories
router.get("/decrement/:id",verifyTokenAndAuthorization,cartController.decrementProductQty);
router.delete("/:id", verifyTokenAndAuthorization,cartController.removecartItem);
router.get("/count", verifyTokenAndAuthorization,cartController.getCardCount);
router.get("/", verifyTokenAndAuthorization,cartController.getCart);

module.exports = router;

const router = require('express').Router();
const addressController = require('../controllers/addressController');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken');

// POST request to add a rating
router.post("/",verifyTokenAndAuthorization,addressController.addAddress);

// GET request to fetch random categories
router.get("/default",verifyTokenAndAuthorization,addressController.getDefaultAddress);
router.delete("/:id", verifyTokenAndAuthorization,addressController.deleteAddress);
router.patch("/default/:id", verifyTokenAndAuthorization,addressController.setAddressDefault);
router.get("/all", verifyTokenAndAuthorization,addressController.getAddresses);

module.exports = router;

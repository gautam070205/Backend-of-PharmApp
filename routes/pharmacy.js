const router = require('express').Router();
const pharmacyController = require('../controllers/pharmacyController');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken');

router.post("/",verifyTokenAndAuthorization,pharmacyController.addPharmacy);
router.get("/:code", pharmacyController.getRandomPharmacy);
router.get("/all/:code", pharmacyController.getAllNearByPharmacy);
router.get("/byId/:id", pharmacyController.getPharmacyById);

module.exports = router;

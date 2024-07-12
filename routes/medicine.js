const router=require('express').Router();
const medicineController=require('../controllers/medicineController');
const{verifyVendor}=require('../middleware/verifyToken');

router.post("/", verifyVendor,medicineController.addMedicine);
router.get("/recommendation/:code", medicineController.getRandomMedicine);
router.get("/bycode/:code",medicineController.getAllMedicineByCode);
router.get("/:id", medicineController.getMedicineById);
router.get("/pharmacy-medicines/:id", medicineController.getMedicinesByPharmacy);

router.get("/search/:search", medicineController.searchMedicines);
router.get("/:category/:code", medicineController.getMedicinesByCategoryAndCode);

module.exports=router;

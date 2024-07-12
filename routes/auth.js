const router=require('express').Router();
const authController = require('../controllers/authController');
// const AuthController = require('../controllers/authController');
// const CategoryController=require('../controllers/categoryController');

router.post("/register",authController.createUser);
router.post("/login",authController.loginUser);
// router.get("/",categoryController.getRandomCategories);
module .exports=router;



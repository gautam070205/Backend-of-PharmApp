const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const CategoryRoute = require('./routes/category');
const PharmacyRoute = require('./routes/pharmacy');
const MedicineRoute=require("./routes/medicine");
const RatingRoute=require("./routes/rating");
const generateOtp = require('./utils/otp_generator');
const sendEmail=require('./utils/smtp_function');
const AuthRoute=require('./routes/auth');
const UserRoute=require('./routes/user');
const AddressRoute=require('./routes/address');
const CartRoute=require('./routes/cart');
const OrderRoute=require('./routes/order');

dotenv.config();

// const otp=generateOtp();
// // console.log(generateOtp());
// console.log(otp);
// sendEmail('hwhuwhs@gmail.com',otp)
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log("medapp connected to database"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the CategoryRoute for /api/category endpoint
app.use("/api/category", CategoryRoute);
app.use("/",AuthRoute);
app.use("/api/users",UserRoute);

app.use("/api/pharmacy",PharmacyRoute);
app.use("/api/medicines",MedicineRoute);
app.use("/api/rating",RatingRoute);
app.use("/api/address",AddressRoute);
app.use("/api/cart",CartRoute);
app.use("/api/order",OrderRoute)
const PORT = process.env.PORT || 6013;
app.listen(PORT, () => console.log(`MedApp server listening on port ${PORT}!`));

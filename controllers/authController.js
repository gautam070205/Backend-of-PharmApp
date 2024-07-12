const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const generateOtp = require('../utils/otp_generator');
const User = require('../models/User'); // Correct import
const sendEmail=require('../utils/smtp_function');
module.exports = {
    createUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: "Invalid E-mail" });
        }
        const minPasswordLength = 8;
        if (req.body.password.length < minPasswordLength) {
            return res.status(400).json({ status: false, message: `Password should be at least ${minPasswordLength} characters long` });
        }
        try {
            const emailExists = await User.findOne({ email: req.body.email }); // Correct model usage
            if (emailExists) {
                return res.status(400).json({ status: false, message: "E-mail already exists" });
            }
            const otp = generateOtp();
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                userType: "Client",
                password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
                otp: otp
            });
            // Save user
            await newUser.save();
            // Send OTP to email (Assuming you have a function for this)
           sendEmail(req.body.email,otp);
            res.status(201).json({ status: true, message: "User Successfully Created" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },
    loginUser: async (req, res) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ status: false, message: "Invalid E-mail" });
        }
        const minPasswordLength = 8;
        if (req.body.password.length < minPasswordLength) {
            return res.status(400).json({ status: false, message: `Password should be at least ${minPasswordLength} characters long` });
        }
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ status: false, message: "User not Found" });
            }
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET); // Correct decryption method
            const depassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
            if (depassword !== req.body.password) { // Correct comparison
                return res.status(400).json({ status: false, message: "Wrong Password" });
            }
            const userToken = jwt.sign({
                id: user._id,
                userType: user.userType,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: "21d" });
            const { password,createdAt,updatedAt,__v, otp, ...others } = user._doc; // Correctly destructuring user document
            res.status(200).json({ ...others, userToken });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};

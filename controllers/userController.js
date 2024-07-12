const User = require('../models/User'); // Correct import of User model
const jwt=require('jsonwebtoken');
module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({ status: false, message: "User Not Found" });
            }
            const { password, _v, createdAt, ...userData } = user._doc;
            res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    verifyAccount: async (req, res) => {
        const userOtp = req.params.otp;
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({ status: false, message: "User Not Found" });
            }
            if (userOtp === user.otp) {
                user.verification = true;
                user.otp = "none";
                await user.save();
                const userToken = jwt.sign({
                    id: user._id,
                    userType: user.userType,
                    email: user.email,
                }, process.env.JWT_SECRET, { expiresIn: "21d" });
                const { password, _v, otp, createdAt, ...others } = user._doc;
                res.status(200).json({ ...others, userToken });
            } else {
                return res.status(400).json({ status: false, message: "Otp Verification Failed" });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    verifyPhone: async (req, res) => {
        const phone = req.params.phone;
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({ status: false, message: "User Not Found" });
            }
            user.phoneVerification = true;
            user.phone = phone;
            await user.save();

           const userToken = jwt.sign({
                    id: user._id,
                    userType: user.userType,
                    email: user.email,
                }, process.env.JWT_SECRET, { expiresIn: "21d" });
                const { password, _v, otp, createdAt, ...others } = user._doc;
                res.status(200).json({ ...others, userToken });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.user.id);
            if (!user) {
                return res.status(400).json({ status: false, message: "User Not Found" });
            }
            res.status(200).json({ status: true, message: "User successfully deleted" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};

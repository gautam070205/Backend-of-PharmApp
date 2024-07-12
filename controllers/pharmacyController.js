const Pharmacy = require('../models/Pharmacy');

module.exports = {
    addPharmacy: async (req, res) => {
        const { title, time, imageUrl, pickup, delivery, isAvailable, owner, code, logoUrl, coords } = req.body;
        if (!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords ||
            !coords.latitude || !coords.longitude || !coords.address || !coords.title) {
            return res.status(400).json({ status: false, message: "You have missing fields" });
        }
        try {
            const newPharmacy = new Pharmacy(req.body);
            await newPharmacy.save();
            res.status(201).json({ status: true, message: "Pharmacy has been successfully created" });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getPharmacyById: async (req, res) => {
        const id = req.params.id;
        try {
            const pharmacy = await Pharmacy.findById(id);
            if (!pharmacy) {
                return res.status(404).json({ status: false, message: "Pharmacy not found" });
            }
            res.status(200).json(pharmacy);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getRandomPharmacy: async (req, res) => {
        const code = req.params.code;
        try {
            let randomPharmacy = [];
            if (code) {
                randomPharmacy = await Pharmacy.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ]);
            }
            if (randomPharmacy.length === 0) {
                randomPharmacy = await Pharmacy.aggregate([
                    { $match: { isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { __v: 0 } }
                ]);
            }
            res.status(200).json(randomPharmacy);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    },

    getAllNearByPharmacy: async (req, res) => {
        const code = req.params.code;
        try {
            let allNearByPharmacy = [];
            if (code) {
                allNearByPharmacy = await Pharmacy.aggregate([
                    { $match: { code: code, isAvailable: true } },
                    { $project: { __v: 0 } }
                ]);
            }
            if (allNearByPharmacy.length === 0) {
                allNearByPharmacy = await Pharmacy.aggregate([
                    { $match: { isAvailable: true } },
                    { $project: { __v: 0 } }
                ]);
            }
            res.status(200).json(allNearByPharmacy);
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
};

const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: String, required: true },
    medicineTags: { type: Array, required: true },
    category: { type: String, required: true },
    medicineType: { type: Array, required: true },
    code: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    ratingCount: { type: String, default: "267" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    additives: { type: Array, default: [] },
    imageUrl: { type: Array, default: [] },
});

module.exports = mongoose.model('Medicine', MedicineSchema);

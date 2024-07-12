const Rating = require('../models/Rating');
const Pharmacy = require('../models/Pharmacy');
const Medicine = require('../models/Medicine');

module.exports = {
  addRating: async (req, res) => {
    const { id, ratingType, product, rating } = req.body;
    const newRating = new Rating({
      userId: id,
      ratingType: ratingType,
      product: product,
      rating: rating
    });

    try {
      await newRating.save();

      if (ratingType === "Pharmacy") {
        const pharmacyRatings = await Rating.aggregate([
          { $match: { ratingType: ratingType, product: product } },
          { $group: { _id: '$product', averageRating: { $avg: '$rating' } } }
        ]);

        if (pharmacyRatings.length > 0) {
          const averageRating = pharmacyRatings[0].averageRating;
          await Pharmacy.findByIdAndUpdate(product, { rating: averageRating }, { new: true });
        }
      } else if (ratingType === "Medicine") {
        const medicineRatings = await Rating.aggregate([
          { $match: { ratingType: ratingType, product: product } },
          { $group: { _id: '$product', averageRating: { $avg: '$rating' } } }
        ]);

        if (medicineRatings.length > 0) {
          const averageRating = medicineRatings[0].averageRating;
          await Medicine.findByIdAndUpdate(product, { rating: averageRating }, { new: true });
        }
      }

      res.status(200).json({ status: true, message: "Rating updated successfully" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  checkUserRating: async (req, res) => {
    const { ratingType, product } = req.body;
    try {
      const existingRating = await Rating.findOne({
        userId: req.user.id,
        product: product,
        ratingType: ratingType
      });

      if (existingRating) {
        res.status(200).json({ status: true, message: "You have already rated this " + ratingType.toLowerCase() });
      } else {
        res.status(200).json({ status: true, message: `You have not rated this ${ratingType.toLowerCase()} yet` });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }
};

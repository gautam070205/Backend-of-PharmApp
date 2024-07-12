const Medicine = require('../models/Medicine');

module.exports = {
  addMedicine: async (req, res) => {
    try {
      const { title, medicineTags, category, code, pharmacy, description, time, price, additives, imageUrl } = req.body;
      if (!title || !medicineTags || !category || !code || !pharmacy || !description || !time || !price || !additives || !imageUrl) {
        return res.status(400).json({ status: false, message: "Missing required fields" });
      }

      const newMedicine = new Medicine({
        title, medicineTags, category, code, pharmacy, description, time, price, additives, imageUrl
      });

      await newMedicine.save();
      res.status(201).json({ status: true, message: "Medicine has been successfully created" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getMedicineById: async (req, res) => {
    const id = req.params.id;
    try {
      const medicine = await Medicine.findById(id);
      if (!medicine) {
        return res.status(404).json({ status: false, message: "Medicine not found" });
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getRandomMedicine: async (req, res) => {
    try {
      let randomMedicineList = [];
      console.log('Starting getRandomMedicine function');
      
      // Log database contents
      const allMedicines = await Medicine.find({});
      console.log('All Medicines:', allMedicines);

      if (req.params.code) {
        console.log('Searching for medicines with code:', req.params.code);
        randomMedicineList = await Medicine.aggregate([
          { $match: { code: req.params.code } },
          { $sample: { size: 5 } },
          { $project: { __v: 0 } }
        ]);
        console.log('Found medicines with code:', randomMedicineList);
      } 

      if (!randomMedicineList.length) {
        console.log('No medicines found with code, fetching random medicines');
        randomMedicineList = await Medicine.aggregate([
          { $sample: { size: 5 } },
          { $project: { __v: 0 } }
        ]);
        console.log('Found random medicines:', randomMedicineList);
      }

      if (randomMedicineList.length) {
        res.status(200).json(randomMedicineList);
      } else {
        console.log('No medicines found');
        res.status(404).json({ status: false, message: "No Medicine is present" });
      }
    } catch (error) {
      console.error('Error fetching random medicine:', error);
      res.status(500).json({ status: false, message: error.message });
    }
  },
  getAllMedicineByCode :async(req,res)=>{
    const code =req.params.code;

    try{
        const medicineList=await Medicine.find({
          code:code
        })
        return res.status(200).json(medicineList)
    }catch{
      res.status(500).json({ status: false, message: error.message });

    }
},
  getMedicinesByPharmacy: async (req, res) => {
    const id = req.params.id;
    try {
      const medicines = await Medicine.find({ pharmacy: id });
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

getMedicinesByCategoryAndCode:async(req,res)=>{
    const {category,code}=req.params;
    try{
      const medicines=await Medicine.aggregate([
        {$match :{category:category,code:code,isAvailable:true}},
        {$project:{__v:0}}
      ]) ;
      if(medicines.length===0){
        return res.status(200).json([]);
      }
      res.status(200).json(medicines);
    }catch(error){
      res.status(500).json({ status: false, message: error.message });

    }
},
searchMedicines: async (req, res) => {
    const search = req.params.search;
    try {
      const results = await Medicine.aggregate([
        {
          $search: {
            index: "medicines",
            text: {
              query: search,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getRandomMedicineByCategoryAndCode: async (req, res) => {
    const { category, code } = req.params;
    try {
      let medicines = await Medicine.aggregate([
        { $match: { category: category, code: code, isAvailable: true } },
        { $sample: { size: 10 } }
      ]);

      if (!medicines || medicines.length === 0) {
        medicines = await Medicine.aggregate([
          { $match: { code: code, isAvailable: true } },
          { $sample: { size: 10 } }
        ]);
      }

      if (!medicines || medicines.length === 0) {
        medicines = await Medicine.aggregate([
          { $match: { isAvailable: true } },
          { $sample: { size: 10 } }
        ]);
      }

      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }
};

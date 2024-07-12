const mongoose = require('mongoose');
const { defaultMaxListeners } = require('nodemailer/lib/xoauth2');

const PharmacySchema =new mongoose.Schema({
    title:{type:String,required :true},
    
    time:{type:String,required :true},
    imageUrl:{type:String,required :true},

    medicines:{type:Array,default :[]},
    pickup:{type:Boolean,default :true},
    delivery:{type:Boolean,default :true},
    isAvailable:{type:Boolean,default :true},

    owner:{type:String,required :true},
    code:{type:String,required :true},
    logoUrl:{type:String,required :true},
    rating:{type:Number,min :1,max:5,default:3},

    ratingCount:{type:String,default:"267"},
    verification:{type:String,default:"Pending",enum:["Pending","Verified","Rejected"]},
    verification:{type:String,default:"Your Pharmacy Is Under Review.We Will Notify You Once it is Verified."},
     coords:{
        id:{type:String},
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        latitudeDelta:{type:Number,defaults:0.0122},
        longitudeDelta:{type:Number,defaults:0.0122},
        address:{type:String,required:true},
        title:{type:String,required:true}

     }
});
module.exports=mongoose.model('Pharmacy',PharmacySchema);
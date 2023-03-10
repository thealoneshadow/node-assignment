const mongoose = require('mongoose');
const companyCardCategoryListSchema = new mongoose.Schema({
    iconURL: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    }
},{ timestamps: true });



module.exports = mongoose.model("companyCardCategoryList", companyCardCategoryListSchema);
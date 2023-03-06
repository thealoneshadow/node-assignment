const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    }
},{ timestamps: true });

userSchema.virtual("fullName").get(function () {
	return `${this.firstName} ${this.lastName}`;
});

// userSchema.pre("save", function (next, req) {

//     const allowedFields = ["firstName", "lastName", "email","password"];
//     const extraFields = Object.keys(req.req).filter(
//       (field) => !allowedFields.includes(field)
//     );
  
//     if (extraFields.length > 0) {
//       return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
//     }
  
//     next();
//   });

//   userSchema.pre("findOne", function (next) {
//     const data = this.getQuery();
//     console.log(data.req);

//     // Validating the request for email and password
//     if(Object.keys(data.req).length === 0){
//       return next(new Error(`Empty request body. Expected fields: {email, password}`));
//     }

//     // Validating the request for email 
//     if(typeof data.req.email !== "string" ||
//     validator.isEmpty(data.req.email)){
//       return next(new Error(`Email is required`));
//     }

//     // Validating the request for password
//     if(typeof data.req.password !== "string" ||
//     validator.isEmpty(data.req.password)){
//       return next(new Error(`Password is required`));
//     }


//     // Validating the request for allowed fields
//     const allowedFields = [ "email","password"];
//     const extraFields = Object.keys(data.req).filter(
//       (field) => !allowedFields.includes(field)
//     );
  
//     if (extraFields.length > 0) {
//       return next(new Error(`Invalid field(s): ${extraFields.join(", ")}`));
//     }
  
//     next();
//   });


userSchema.methods = {
	authenticate: async function (password) {
		return await bcrypt.compare(password, this.hash_password);
	},
};
module.exports = mongoose.model("User", userSchema);
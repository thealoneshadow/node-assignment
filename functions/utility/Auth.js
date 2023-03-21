const validator = require("validator");
const { responseGenerator } = require("./response");

exports.validateSignUp = async (req, res, next) => {
    console.log(req.body);
  
    // Validating the request for Empty Body
    if (Object.keys(req.body).length === 0) {
  
      return  responseGenerator(res,400,false,"Request Body is Empty",[]);
    }
  
    // Validating the request for missing fields
    if (
      req.body.firstName == undefined ||
      req.body.lastName == undefined ||
      req.body.email == undefined ||
      req.body.password == undefined
    ) {
      return  responseGenerator(res,400,false,"Fields Missing Expected:{firstName,lastName,email, password }",[]);
    }
  
    // Validating the request for allowed fields
    const allowedFields = ["firstName", "lastName", "email", "password"];
    const extraFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
  
    if (extraFields.length > 0) {
      return  responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
    }

    // Validating the request for firstName
  if (
    typeof req.body.firstName !== "string" ||
    validator.isEmpty(req.body.firstName) ||
    validator.isWhitelisted(req.body.firstName, " ")
  ) {
    return  responseGenerator(res,400,false,"firstName is required as String and must not be Empty",[]);
  }
  
    // Validating the request for lastName
    if (
      typeof req.body.lastName !== "string" ||
      validator.isEmpty(req.body.lastName) ||
      validator.isWhitelisted(req.body.lastName, " ")
    ) {
      return  responseGenerator(res,400,false,"lastName is required as String and must not be Empty",[]);
    }
  
    // Validating the request for lastName
    if (
      typeof req.body.email !== "string" ||
      validator.isEmpty(req.body.email) ||
      !validator.isEmail(req.body.email)
    ) {
      return  responseGenerator(res,400,false,"Email is required and must be a valid email",[]);
    }
  
    // Validating the request for password
    if (
      typeof req.body.password !== "string" ||
      validator.isEmpty(req.body.password) ||
        !validator.isLength(req.body.password, { min: 6 }) ||
        !validator.isAlphanumeric(req.body.password)
    ) {
      return  responseGenerator(res,400,false,"Password must not empty, must be atleast 6 characters and Alphanumeric",[]);
    }
    next();
  };


  //Signin Validation
  exports.validateSignIn = async (req, res, next) => {
    console.log(req.body);
  
    // Validating the request for Empty Body
    if (Object.keys(req.body).length === 0) {
  
      return  responseGenerator(res,400,false,"Request Body is Empty",[]);
    }
  
    // Validating the request for missing fields
    if (
      req.body.email == undefined ||
      req.body.password == undefined
    ) {
      return  responseGenerator(res,400,false,"Fields Missing Expected:{email, password }",[]);
    }
  
    // Validating the request for allowed fields
    const allowedFields = ["email", "password"];
    const extraFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
  
    if (extraFields.length > 0) {
      return  responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
    }

  
    // Validating the request for Email
    if (
      typeof req.body.email !== "string" ||
      validator.isEmpty(req.body.email) ||
      !validator.isEmail(req.body.email)
    ) {
      return  responseGenerator(res,400,false,"Email is required and must be a valid email",[]);
    }
  
    // Validating the request for password
    if (
      typeof req.body.password !== "string" ||
      validator.isEmpty(req.body.password) ||
        !validator.isLength(req.body.password, { min: 6 }) ||
        !validator.isAlphanumeric(req.body.password)
    ) {
      return  responseGenerator(res,400,false,"Password must not empty, must be atleast 6 characters and Alphanumeric",[]);
    }
    next();
  };

  exports.validateOTP = async (req, res, next) => {
    console.log(req.body);
  
    // Validating the request for Empty Body
    if (Object.keys(req.body).length === 0) {
  
      return  responseGenerator(res,400,false,"Request Body is Empty",[]);
    }
  
    // Validating the request for missing fields
    if (
      req.body.id == undefined ||
      req.body.otp == undefined
    ) {
      return  responseGenerator(res,400,false,"Fields Missing Expected:{id,otp }",[]);
    }
  
    // Validating the request for allowed fields
    const allowedFields = ['id', 'otp'];
    const extraFields = Object.keys(req.body).filter(
      (field) => !allowedFields.includes(field)
    );
  
    if (extraFields.length > 0) {
      return  responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
    }

  
  
    // Validating the request for id
    if (
        typeof req.body.id !== "string" ||
        validator.isEmpty(req.body.id) ||
        validator.isWhitelisted(req.body.id, " ") ||
        !validator.isMongoId(req.body.id)
      ) {
        return responseGenerator(res,400,false,"Valid User id is required and must not be Empty",[]);
      }
  
    // Validating the request for otp
      if (
        typeof req.body.otp !== "string" ||
        validator.isEmpty(req.body.otp) ||
        validator.isWhitelisted(req.body.otp, " ") || 
        validator.contains(req.body.otp, ' ') ||
        !validator.isLength(req.body.otp, { min:4, max:4 })
      ) {
        return responseGenerator(res,400,false,"Valid OTP is required in String format and must not be Empty. Check Your Email for a 4 Digit OTP valid for 5 minutes",[]);
      }
    next();
  };
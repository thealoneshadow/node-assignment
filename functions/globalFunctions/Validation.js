const { responseGenerator } = require("./response");
const validator = require("./validationFunctions");
exports.validation = (format,types,body,res,next) => {

  // Validating the request for Empty Body
  if (Object.keys(body).length === 0) return {success:false,message:"Request Body is Empty"};

  // Validating the request for allowed fields
  const allowedFields = format;
  const extraFields = Object.keys(body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return {success:false,message:`Invalid field(s): ${extraFields.join(", ")} Expected format:${format}`};
  }



    const bodyResponse = Object.values(body);
    const keys = Object.keys(body);
    for(let i=0;i<types.length;i++){
        if(types[i] == "string"){
            if (
                typeof bodyResponse[i] !== types[i] ||
                bodyResponse[i].length === 0 ||
                bodyResponse[i] == " " ||
                bodyResponse[i].includes("  ")
              ) {
                return {success:false,message:`Valid ${types[i]} is required for ${keys[i]} field and must not be Empty`};
              }
        }
        else if(types[i] == "number"){
            if (
                typeof bodyResponse[i] !== "number" ||
                bodyResponse[i] == null || bodyResponse[i] < 0
            ) {
                return {success:false,message:`Valid ${types[i]} is required for ${keys[i]} field and must not be Empty`};
            }

        } else if(types[i] == "email"){
            if (
                typeof bodyResponse[i] !== "string" ||
                bodyResponse[i].length === 0  ||
                !validator.isEmail(bodyResponse[i])
              ) {
                return {success:false,message:`Email is required for ${keys[i]} field and must be a valid email`};
              }

        } else if(types[i] == "password"){
            if (
                typeof bodyResponse[i] !== "string" ||
                bodyResponse[i].length === 0  ||
                  !bodyResponse[i].length >= 6 ||
                  !validator.checkAlphanumeric(bodyResponse[i])
              ) {
                return {success:false,message:"Password must not empty, must be atleast 6 characters and Alphanumeric"};
              }

        } else if(types[i] == "date"){

            if (
                typeof bodyResponse[i] !== "string" ||
                bodyResponse[i].length === 0  ||
                !validator.isISO8601(bodyResponse[i])
              ) {
                return {success:false,message:"Date is required and must be a valid date string in ISO 8601 format"}
              }

        } else if(types[i] == "id"){
            if (
                typeof bodyResponse[i] !== "string" ||
                bodyResponse[i].length === 0  ||
                bodyResponse[i].includes(" ") ||
                !validator.isMongoId(bodyResponse[i])
            ) {
                return {success:false,message:"Valid Id is required and must not be Empty"};
            }

        } else if(types[i] == "status"){
            if (
                typeof bodyResponse[i] !== "string" ||
                bodyResponse[i].length === 0  ||
                !validator.isIn(bodyResponse[i], ["Complete", "Incomplete"])
              ) {
                return {success:false,message:"Status is required and must be either Complete or Incomplete"};
              }
        } else if(types[i] == "otp"){
          if (
            typeof bodyResponse[i] !== "string" ||
            bodyResponse[i].length === 0 ||
            bodyResponse[i].includes(" ") || 
            bodyResponse[i].length != 4
          ) {
            return {success:false,message:"Valid OTP is required in String format and must not be Empty. Check Your Email for a 4 Digit OTP valid for 5 minutes"}
          }
        } 
        else {
            return {success:false,message:`Invalid type:${types[i]}`};
        }
    }

    return {success:true,message:""}
}
const validator = require("validator");
const Task = require("../models/task");
const { responseGenerator } = require("./response");
const { hasDuplicateFields } = require("./duplicate");


exports.ValidateSaveTask = async (req, res, next) => {
  console.log(req.body);

  // Validating the request for Empty Body
  if (Object.keys(req.body).length === 0) {

    return  responseGenerator(res,400,false,"Request Body is Empty",[]);
  }

  // Validating the request for missing fields
  if (
    req.body.title == undefined ||
    req.body.date == undefined ||
    req.body.status == undefined
  ) {
    return  responseGenerator(res,400,false,"Fields Missing Expected:{title,date,status}",[]);
  }

  // Validating the request for allowed fields
  const allowedFields = ["title", "date", "status"];
  const extraFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return  responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
  }

//   console.log("Duplicate Fields",hasDuplicateFields(req.body));
//   if(hasDuplicateFields(req.body)){
//     return  responseGenerator(res,400,false,"Duplicate Fields Found",[]);
//   }

  // Validating the request for title
  if (
    typeof req.body.title !== "string" ||
    validator.isEmpty(req.body.title) ||
    validator.isWhitelisted(req.body.title, " ")
  ) {
    return  responseGenerator(res,400,false,"Title is required and must not be Empty",[]);
  }

  // Validating the request for date
  if (
    typeof req.body.date !== "string" ||
    validator.isEmpty(req.body.date) ||
    !validator.isISO8601(req.body.date)
  ) {
    return  responseGenerator(res,400,false,"Date is required and must be a valid date string in ISO 8601 format",[]);
  }

  // Validating the request for status
  if (
    typeof req.body.status !== "string" ||
    validator.isEmpty(req.body.status) ||
    !validator.isIn(req.body.status, ["Complete", "Incomplete"])
  ) {
    return  responseGenerator(res,400,false,"Status is required and must be either Complete or Incomplete",[]);
  }
  next();
};

exports.ValidateUpdateTask = async (req, res, next) => {
  console.log(req.body);

  // Validating the request for Empty Body
  if (Object.keys(req.body).length === 0) {
    return  responseGenerator(res,400,false,"Request Body is Empty",[]);
  }

  // Validating the request for missing fields
  if (
    req.body._id == undefined ||
    req.body.title == undefined ||
    req.body.date == undefined ||
    req.body.status == undefined
  ) {
    return  responseGenerator(res,400,false,"Fields Missing Expected:{title,date,status}",[]);
  }

  // Validating the request for allowed fields
  const allowedFields = ["_id", "title", "date", "status"];
  const extraFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
  }

  // Validating the request for _id
  if (
    typeof req.body._id !== "string" ||
    validator.isEmpty(req.body._id) ||
    validator.isWhitelisted(req.body._id, " ") ||
    !validator.isMongoId(req.body._id)
  ) {
    return responseGenerator(res,400,false,"Valid Task id is required and must not be Empty",[]);
  }

  // Validating the request for title
  if (
    typeof req.body.title !== "string" ||
    validator.isEmpty(req.body.title) ||
    validator.isWhitelisted(req.body.title, " ")
  ) {
    return responseGenerator(res,400,false,"Ttitle is required and must not be Empty",[]);
  }

  // Validating the request for date
  if (
    typeof req.body.date !== "string" ||
    validator.isEmpty(req.body.date) ||
    !validator.isISO8601(req.body.date)
  ) {
    return  responseGenerator(res,400,false,"Date is required and must be a valid date string in ISO 8601 format",[]);
  }

  // Validating the request for status
  if (
    typeof req.body.status !== "string" ||
    validator.isEmpty(req.body.status) ||
    !validator.isIn(req.body.status, ["Complete", "Incomplete"])
  ) {
    return responseGenerator(res,400,false,"Status is required and must be either Complete or Incomplete",[]);
  }
  next();
};

exports.ValidateDeleteTask = async (req, res, next) => {
  console.log(req.body);

  // Validating the request for Empty Body
  if (Object.keys(req.body).length === 0) {
    return  responseGenerator(res,400,false,"Request Body is Empty",[]);
  }

  // Validating the request for missing fields
  if (req.body._id == undefined) {
    return responseGenerator(res,400,false,"Field Missing Expected:{_id}",[]);
  }

  // Validating the request for allowed fields
  const allowedFields = ["_id"];
  const extraFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length > 0) {
    return responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
  }

  // Validating the request for _id
  if (
    typeof req.body._id !== "string" ||
    validator.isEmpty(req.body._id) ||
    validator.isWhitelisted(req.body._id, " ") ||
    !validator.isMongoId(req.body._id)
  ) {
    return responseGenerator(res,400,false,"Valid Task id is required and must not be Empty",[]);
  }

  next();
};


exports.ValidateSortTask = async (req, res, next) => {
    console.log(req.body);
    
    // Validating the request for Empty Body
    for(let i=0 ; i<req.body.length ; i++){
        let key = req.body[i];
        console.log(key)
        // Validating the request for Empty Body
        if (Object.keys(key).length === 0) {
            return  responseGenerator(res,400,false,"Request Body is Empty",[]);
        }

        // Validating the request for missing fields
        if (
            key._id == undefined ||
            key.position == undefined ||
            key.currentPosition == undefined
          ) {
            return  responseGenerator(res,400,false,"Fields Missing Expected:{_id,position,currentPosition}",[]);
          }

        // Validating the request for allowed fields
        const allowedFields = ["_id","position","currentPosition"];
        const extraFields = Object.keys(key).filter((field) => !allowedFields.includes(field));
  
        if (extraFields.length > 0) {
         return responseGenerator(res,400,false,`Invalid field(s): ${extraFields.join(", ")}`,[]);
        }

        // Validating the request for _id
        if (
            typeof key._id !== "string" ||
            validator.isEmpty(key._id) ||
            validator.isWhitelisted(key._id, " ") ||
            !validator.isMongoId(key._id)
        ) {
            return responseGenerator(res,400,false,"Valid Task id is required and must not be Empty",[]);
        }

        // Validating the request for position
        if (
            typeof key.position !== "number" ||
            key.position == null || key.position < 0
        ) {
            return responseGenerator(res,400,false,"Valid Position is required and must not be Empty",[]);
        }

        // Validating the request for position
        if (
            typeof key.currentPosition !== "number" ||
            key.currentPosition == null || key.currentPosition < 0
        ) {
            return responseGenerator(res,400,false,"Valid Current Position is required and must not be Empty",[]);
        }

    }

  
    next();
  };
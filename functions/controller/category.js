// const { validation } = require("../Global Functions/Validation");
// const { responseGenerator } = require("../Global Functions/response");
// const companyCardCategoryImageList = require("../models/companyCardCategoryImageList");
// const companyCardCategoryList = require("../models/companyCardCategoryList");

// exports.getCompanyCardCategory = async (req, res) => {
//     const result = await companyCardCategoryList.find().lean(false).exec();
//     console.log(result.length);
//     if(result.length === 0){
//         return responseGenerator(res, 400, false, "No Categories Found", []);
//     }
//     return res.status(200).json({success:true, isAuth:true, categoryCount:result.length,  result:[result] });
//   };

// exports.getCompanyCardCategoryImageList = async (req, res) => {
//     const array = [];
//     for(let i=0 ; i<req.body.cardCategories.length ; i++){
//         const validate = validation(["_id"],["id"],req.body.cardCategories[i],res);
//     if(!validate.success){
//       return responseGenerator(res, 400, false, validate.message, []);
//     }
//     //const result = await companyCardCategoryImageList.find().lean(false).exec();
//     const result = await companyCardCategoryImageList.find({categoryId: req.body.cardCategories[i]._id}).exec();
//     if(result.length === 0){
//       array.push([{"message":"No Images Found"}]);
//     } else 
//     {
//       array.push(result);
//     }
//     console.log(req.body.cardCategories[i]._id)
//     //console.log(result[0].categoryId);

    
//     }
//     return res.status(200).json({success:true, isAuth:true, categoryCount:array.length,  result:array });
//   };

//   exports.getSingleCompanyCardCategoryImage = async (req, res) => {
//         const validate = validation(["categoryId"],["id"],req.body,res);
//     if(!validate.success){
//       return responseGenerator(res, 400, false, validate.message, []);
//     }
//     //const result = await companyCardCategoryImageList.find().lean(false).exec();
//     const result = await companyCardCategoryImageList.find({categoryId: req.body.categoryId}).exec();
//     if(result.length === 0){
//         return responseGenerator(res, 400, false, "No Images Found", []);
//     }
//     console.log(req.body)
    
//     return res.status(200).json({success:true, isAuth:true, categoryCount:result.length,  result:[result] });
//   };


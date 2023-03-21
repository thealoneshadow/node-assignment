const { newResponseGenerator } = require("../../utility/response");
const companyCardCategoryList = require("../../models/companyCardCategoryList");

exports.getCompanyCardCategory = async (req, res) => {
  // Find the card categories
  const result = await companyCardCategoryList.find({}, {"_id": 0 ,"name":1,"iconURL":1,"categoryId": "$_id",}).lean(false).exec();

  // Check if the result is empty
  if (result.length === 0) {
    return newResponseGenerator(res, 400, false, "No Categories Found", []);
  }

  // Return the result
  return res.status(200).json({
    success: true,
    isAuth: true,
    message: "Fetched list of all Company Card Categories.",
    categoryCount: result.length,
    result: result,
  });
};

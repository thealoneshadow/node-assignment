const { validation } = require("../../utility/Validation");
const { newResponseGenerator } = require("../../utility/response");
const companyCardCategoryImageList = require("../../models/companyCardCategoryImageList");
const companyCardCategoryList = require("../../models/companyCardCategoryList");
const { getSingleCompanyCardCategoryImageData } = require("./postCardCategoryDataChecker");
const { validatePostArray } = require("./postCardCategoryValidator");
exports.getCompanyCardCategoryImageList = async (req, res) => {
  const array = [];
  count = 0;
  const checkResponse = validatePostArray(req.body);
  if(!checkResponse.success){
    return newResponseGenerator(res, 400, false, checkResponse.message, []);
  }
  // Loop through the array of card categories Ids
  for (let i = 0; i < req.body.cardCategories.length; i++) {
    // Validate the card category Id
    const validate = validation(["_id"],["id"],req.body.cardCategories[i],res);
    if (!validate.success) {
      return newResponseGenerator(res, 400, false, validate.message, []);
    }
    // Find the images for each category
    const category = await companyCardCategoryList.findOne({_id:req.body.cardCategories[i]._id}).lean(false).exec();

    // Check if the category is empty
    if (category === null) {
      return newResponseGenerator(res, 400, false, "Invalid categroy Id passed", []);
    }
    const result = await getSingleCompanyCardCategoryImageData(req.body.cardCategories[i]._id);
    if (result.length === 0 && category === null) {
      array.push({
        cardImagesCount: 0,
        categoryCards: [],
      });
    } else if (result.length === 0) {
      array.push({
        categoryId: category._id,
        categoryName: category.name,
        cardImagesCount: 0,
        categoryCards: [],
      });
    } else {
      array.push({
        categoryId: category._id,
        categoryName: category.name,
        cardImagesCount: result.length,
        categoryCards: result,
      });
    }
    count = count + result.length;
  }

  // Return the result
  return res.status(200).json({
    success: true,
    isAuth: true,
    message: "Fetched list of Company Cards for selected Card Categories",
    totalCardImagesCount: count,
    result: array,
  });
};

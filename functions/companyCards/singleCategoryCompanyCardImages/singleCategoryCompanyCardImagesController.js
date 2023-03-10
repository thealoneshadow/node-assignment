const { validation } = require("../../globalFunctions/Validation");
const {
  newResponseGenerator,
} = require("../../globalFunctions/response");
const companyCardCategoryImageList = require("../../models/companyCardCategoryImageList");
const companyCardCategoryList = require("../../models/companyCardCategoryList");
exports.getSingleCompanyCardCategoryImage = async (req, res) => {
  // Validate the request body
  const validate = validation(["categoryId"], ["id"], req.body, res);
  if (!validate.success) {
    return newResponseGenerator(res, 400, false, validate.message, []);
  }
  // Find the images for the category
  const category = await companyCardCategoryList.findOne({_id:req.body.categoryId}).lean(false).exec();

  // Check if the category is empty
  if (category === null) {
    return newResponseGenerator(res, 400, false, "Invalid categroy Id passed", []);
  }

  const result = await companyCardCategoryImageList
    .find(
      { categoryId: req.body.categoryId },
      {
        cardImageId: 1,
        cardImageURL: 1,
        cardDesignType: 1,
        cardCreatorUserName: 1,
        cardCreatorUserId: 1,
        cardCreatedDate: 1,
        favouriteStatus: 1,
        cardImageId: "$_id",
        _id: 0,
        favouriteStatus: "false",
      }
    )
    .exec();

  // Return the result
  return res.status(200).json({
    success: true,
    isAuth: true,
    message: "Fetched list of Cards for selected SIngle Card Category",
    categoryId: category._id,
    categoryName: category.name,
    cardImagesCount: result.length,
    result: result,
  });
};

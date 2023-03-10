const companyCardCategoryImageList = require("../../models/companyCardCategoryImageList");

exports.getSingleCompanyCardCategoryImageData = async (id) => {
    return companyCardCategoryImageList
    .find(
      { categoryId: id },
      {
        cardImageId: 1,
        cardImageURL: 1,
        cardDesignType: 1,
        cardCreatorUserName: 1,
        cardCreatorUserId: 1,
        cardCreatedDate: 1,
        cardImageId: "$_id",
        _id: 0,
        favouriteStatus: "false",
      }
    )
    .exec();
}
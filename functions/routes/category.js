const express = require("express");
const { requireSignin } = require("../middleware");
const { getCompanyCardCategory } = require("../companyCards/getCompanyCardCategories/getCompanyCardCategoriesController");
const { getSingleCompanyCardCategoryImage } = require("../companyCards/singleCategoryCompanyCardImages/singleCategoryCompanyCardImagesController");
const { getCompanyCardCategoryImageList } = require("../companyCards/postCardCategory/postCardCategoryController");

const router = express.Router();

// router.post(
//   "/createTask",
//   requireSignin,
//   createTask
// );
router.get("/getCompanyCardCategory",requireSignin, getCompanyCardCategory);
router.post("/getcompanyCardCategoryImageList",requireSignin, getCompanyCardCategoryImageList);
router.post("/getSingleCompanyCardCategoryImage",requireSignin, getSingleCompanyCardCategoryImage);


module.exports = router;

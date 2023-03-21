const express = require("express");
const { requireSignin } = require("../middleware");
const { addSpecificNoOfNetworks } = require("../companyProfile/networks/addSpecificNoOfNetworks/addSpecificNoOfNetworksController");
const { deleteAllNetworksFromUser } = require("../companyProfile/networks/deleteAllNetworksFromUsers/deleteAllNetworksFromUsersController");
const { viewAllNetworksForUser } = require("../companyProfile/networks/viewAvailableNetworks/viewAvailableNetworksController");
const { editUserColors } = require("../companyProfile/profileColor/editCompanyProfileColorController");
//const { getCompanyCardCategoryImageList } = require("../companyCards/postCardCategory/postCardCategoryController");

const router = express.Router();

// router.post(
//   "/createTask",
//   requireSignin,
//   createTask
// );
router.post("/addSpecificNoOfNetworks",requireSignin, addSpecificNoOfNetworks);
router.delete("/deleteAllNetworksFromUser",requireSignin, deleteAllNetworksFromUser);
router.get("/viewAllNetworksForUser",requireSignin, viewAllNetworksForUser);
router.patch("/editUserColors",requireSignin, editUserColors);


module.exports = router;

const { check, validationResult,matchedData } = require("express-validator");
exports.validateCreateTaskRequest = [
	check("title").notEmpty().withMessage("Title is required"),
	check("date").notEmpty().isISO8601('yyyy-mm-dd').toDate().withMessage("Date is required in '2018-03-19' format"),
	check("status").notEmpty().isIn(['Completed', 'Incomplete']).withMessage("Status is required in 'Completed' or 'Incomplete' format"),
];

exports.validatePatchTaskRequest = [
	check("_id").notEmpty().withMessage("Id is required"),
    check("title").notEmpty().withMessage("Title is required"),
	check("date").notEmpty().isISO8601('yyyy-mm-dd').toDate().withMessage("Date is required in '2018-03-19' format"),
	check("status").notEmpty().isIn(['Completed', 'Incomplete']).withMessage("Status is required in 'Completed' or 'Incomplete' format"),
];

exports.validateDeleteTaskRequest = [
	check("_id").notEmpty().withMessage("Id is required"),
];

exports.isRequestValidated = (req, res, next) => {
	const keys1 = Object.keys(req.body);
	const keys2 = Object.keys(matchedData(req));
	const errors = validationResult(req);
	if (errors.array().length > 0) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}else if (keys1.length !== keys2.length) {
		return res.status(400).json({
		  errors: "Invalid /Extra Keys Passed",
		});
	  }
	next();
};
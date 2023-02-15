const { check, validationResult } = require("express-validator");
exports.validateCreateTaskRequest = [
	check("title").notEmpty().withMessage("Title is required"),
	check("date").notEmpty().withMessage("Date is required in '2018-03-19' format"),
	check("status").notEmpty().isIn(['Completed', 'Incomplete']).withMessage("Status is required in 'Completed' or 'Incomplete' format"),
];

exports.validatePatchTaskRequest = [
	check("_id").notEmpty().withMessage("Id is required"),
    check("title").notEmpty().withMessage("Title is required"),
	check("date").notEmpty().withMessage("Date is required in '2018-03-19' format"),
	check("status").notEmpty().isIn(['Completed', 'Incomplete']).withMessage("Status is required in 'Completed' or 'Incomplete' format"),
];

exports.validateDeleteTaskRequest = [
	check("_id").notEmpty().withMessage("Id is required"),
];

exports.isRequestValidated = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.array().length > 0) {
		return res.status(400).json({
			errors: errors.array()[0].msg,
		});
	}
	next();
};
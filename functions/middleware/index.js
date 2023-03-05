const jwt = require("jsonwebtoken");
exports.requireSignin = (req, res, next) => {
	console.log(req.authorization)
	try{
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			const user = jwt.verify(token, process.env.JWT_SECRET);
			req.user = user;
			if(!user){
				return res.status(400).json({success:false, message: "Auth Failed Invalid Token" });
			}
		} else {
			return res.status(400).json({success:false, message: "Empty Token Auth Failed" });
		}
		next();
	} catch(err){
		res.status(400).json({ message: "Auth Failed Invalid/Expired Token" });
	}
};
const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");

const idChecker = (req,res,next) => {
    if (!req?.params?.id) {
        next(new ApiError("Lütfen geçerli bir id giriniz.",httpStatus.BAD_REQUEST))
        return;
    }
    next();
}

module.exports = idChecker
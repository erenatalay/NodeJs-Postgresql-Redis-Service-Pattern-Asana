const httpStatus = require("http-status");
const ApiError = require("../errors/ApiError");

const idChecker = (field) => (req, res, next) => {
    const idField = field || "id";
    if (!req?.params[idField]) {
        next(new ApiError("Lütfen geçerli bir id giriniz.", httpStatus.BAD_REQUEST))
        return;
    }
    next();
}

module.exports = idChecker
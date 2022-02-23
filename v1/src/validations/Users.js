const Joi = require("joi");
const createValidation = Joi.object({
    full_name : Joi.string().required().min(3),
    password : Joi.string().required().min(8),
    email : Joi.string().required().min(8).email(),

})

const loginValidation = Joi.object({
    password : Joi.string().required().min(8),
    email : Joi.string().required().min(8).email(),

})


module.exports = {
    createValidation,
    loginValidation
}
const Joi = require("joi");
const createValidation = Joi.object({
    full_name : Joi.string().required().min(3),
    password : Joi.string().required().min(8),
    email : Joi.string().required().min(8).email(),

})

const updateValidation = Joi.object({
    full_name : Joi.string().min(3),
    email : Joi.string().min(8).email(),

})


const loginValidation = Joi.object({
    password : Joi.string().required().min(8),
    email : Joi.string().required().min(8).email(),

})
const resetPasswordValidation = Joi.object({
    email : Joi.string().required().min(8).email(),

})


module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateValidation
}
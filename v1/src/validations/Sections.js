const Joi = require("joi");
const createValidation = Joi.object({
    name : Joi.string().required().min(5),
    project_id : Joi.string().required()
})
const updateValidation = Joi.object({
    name : Joi.string().min(5),
    project_id : Joi.string()

})

module.exports = {
    createValidation,
    updateValidation
}
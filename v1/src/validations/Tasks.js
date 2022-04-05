const Joi = require("joi");
const createValidation = Joi.object({
    title : Joi.string().required().min(3),
    section_id : Joi.string().required(),
    project_id : Joi.string().required(),
})
const updateValidation = Joi.object({
    title : Joi.string().min(3),

})

module.exports = {
    createValidation,
    updateValidation
}
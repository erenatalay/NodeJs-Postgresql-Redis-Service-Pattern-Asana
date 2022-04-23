const Joi = require("joi");
const createValidation = Joi.object({
    title : Joi.string().required().min(3),
    section_id : Joi.required(),
    project_id : Joi.required(),
    description : Joi.string().required().min(8),
    statues : Joi.string().required().min(8),
    assigned_to : Joi.number(),
    due_date : Joi.date(),
    statues : Joi.array(),
    order : Joi.number(),
    isComplated : Joi.boolean(),
})
const updateValidation = Joi.object({
    title : Joi.string().min(3),

})

module.exports = {
    createValidation,
    updateValidation
}
const Joi = require("joi");
const createValidation = Joi.object({
    text : Joi.string().required().min(5),
    task_id : Joi.number().required(),
})
const updateValidation = Joi.object({
    text : Joi.string().min(5),

})

module.exports = {
    createValidation,
    updateValidation
}
import Joi from 'joi'

const addBookValidSchema = Joi.object({
    title: Joi.string().min(2).max(1000).required(),
    content: Joi.string().min(2).max(2000).required(),
    author: Joi.string().min(2).max(24).required(),
})

const updateBookValidSchema = Joi.object({
    title: Joi.string().min(2).max(1000),
    content: Joi.string().min(2).max(2000),
    id: Joi.string().hex().length(24).required()
})

export {
    addBookValidSchema,
    updateBookValidSchema
}
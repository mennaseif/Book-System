import Joi from 'joi'

const signupValidSchema= Joi.object({
    name:Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
})

const loginValidSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required()
})

const addAuthorValidSchema = Joi.object({
    name:Joi.string().min(2).max(20).required(),
    bio: Joi.string().min(3).max(50).required(),
})

const updateAuthorValidSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    bio: Joi.string().min(3).max(50),
    id: Joi.string().hex().length(24).required()
})


export{
    signupValidSchema,
    loginValidSchema,
    addAuthorValidSchema,
    updateAuthorValidSchema
}
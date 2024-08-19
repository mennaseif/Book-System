import { Router } from "express";
import { addAuthor, deleteAuthor, getAllAuthors, getAuthorById, login, signup, updateAuthor } from "./author.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { validate } from "../../middleware/validate.js";
import { addAuthorValidSchema, loginValidSchema, signupValidSchema, updateAuthorValidSchema } from "./author.validation.js";
 


const authorRouter = Router()

authorRouter.post('/signup',validate(signupValidSchema), checkEmail, signup)
authorRouter.post('/login',validate(loginValidSchema), login)
authorRouter.post('/',validate(addAuthorValidSchema), addAuthor)
authorRouter.get('/', getAllAuthors)
authorRouter.get('/:id', getAuthorById)
authorRouter.patch('/:id',validate(updateAuthorValidSchema),updateAuthor)
authorRouter.delete('/:id', deleteAuthor)

export default authorRouter
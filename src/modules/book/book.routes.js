import { Router } from "express";
import { addBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "./book.controller.js";
import { validate } from "../../middleware/validate.js";
import { addBookValidSchema, updateBookValidSchema } from "./book.validation.js";
import { verifyToken } from "../../middleware/verifyToken.js";


const bookRouter = Router()

bookRouter.use(verifyToken)
bookRouter.post('/', validate(addBookValidSchema), addBook)
bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getBookById)
bookRouter.patch('/:id', validate(updateBookValidSchema),updateBookById)
bookRouter.delete('/:id', deleteBookById)

export default bookRouter
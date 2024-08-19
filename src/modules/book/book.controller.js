import { Author } from "../../../database/models/author.model.js";
import { Book } from "../../../database/models/book.model.js"
import { AppError } from "../../../utils/appError.js";
import { catchError } from "../../middleware/catchError.js";


const addBook = catchError(async (req, res) =>{ 
    const { title, content, author } = req.body;
    const newBook = new Book({ title, content, author });
    const savedBook = await newBook.save();

    await Author.findByIdAndUpdate(author, { $push: { books: savedBook._id } });

    res.status(201).json({ message: 'Book created successfully', book: savedBook });
})

const getAllBooks =catchError(async (req, res) =>{ 
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(parseInt(limit));

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
        message: 'success',
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
        books
    });
})

const getBookById = catchError(async (req, res, next)=>{
    let book = await Book.findById(req.params.id)
    if(!book) return next(new AppError('Book is not found',404))
        res.status(201).json({message:"success", book})
})

const updateBookById = catchError(async (req, res, next) =>{
    let book = await Book.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    if(!book) return next(new AppError('Book is not found',404))
        res.status(201).json({message:"success", book})
})

const deleteBookById = catchError(async (req, res, next) =>{
    let book = await Book.findByIdAndDelete(req.params.id)
    if(!book) return next(new AppError('Book is not found',404))
        res.status(201).json({message:"success", book})
})


export {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}
import { Author } from "../../../database/models/author.model.js"
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmails } from "../../email/email.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../../utils/appError.js"


const signup = catchError(async (req, res) =>{
    let author = await Author.insertMany(req.body)
    sendEmails(req.body.email)
    author[0].password = undefined
    res.status(201).json({message:"success", author})
})


const login = catchError(async (req, res, next) =>{

    let author = await Author.findOne({email: req.body.email})
    if(!author || !bcrypt.compareSync(req.body.password, author.password))
        return next(new AppError('Wrong email or password',401))

    jwt.sign({_id:author._id, name: author.name, role:author.role},
        'myNameIsMenna', (err, token) =>{
            res.status(201).json({message:"login successfully", token})
        })
})


const addAuthor = catchError(async (req, res) =>{
    let author = await Author.insertMany(req.body)
    res.status(201).json({message:"success", author})
})


const getAllAuthors = catchError(async (req, res) =>{
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const authors = await Author.find().skip(skip).limit(parseInt(limit)).populate('books'); // Populate books if needed

    const totalAuthors = await Author.countDocuments();

    res.status(200).json({
        message: 'success',
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalAuthors / limit),
        totalAuthors,
        authors
    });
})


const getAuthorById = catchError(async (req, res, next) =>{
    let authors = await Author.findById(req.params.id).populate('books')
    if(!authors) return next(new AppError('No authors found',404))
        res.status(201).json({message:"success",authors})
})


const updateAuthor = catchError(async (req, res, next) =>{
    let authors = await Author.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    if(!authors) return next(new AppError('No authors found',404))
        res.status(201).json({message:"success",authors})
})

const deleteAuthor = catchError(async (req, res, next) =>{
    let authors = await Author.findByIdAndDelete(req.params.id)
    if(!authors) return next(new AppError('No authors found',404))
        res.status(201).json({message:"success",authors})
})


export{
    signup,
    login,
    addAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
}
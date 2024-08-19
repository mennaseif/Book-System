import bcrypt from "bcrypt"
import { Author } from "../../database/models/author.model.js"


export const checkEmail = async (req, res, next) =>{
    let isFound = await Author.findOne({email: req.body.email})
    if(isFound) return res.status(409).json({message:"email is already exist"})
        req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}
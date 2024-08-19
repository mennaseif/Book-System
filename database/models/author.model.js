import { model, Schema, Types } from "mongoose";


const schema = new Schema({
    name:{type: String, required: true },
    bio:String,
    email:String,
    password:String,
    birthDate:Date,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role: {
        type:String,
        enum:['admin', 'user'],
        default: 'user'
    },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
},{
    timestamps: {updatedAt: false},
    versionKey: false
})

export const Author = model ("Author", schema)
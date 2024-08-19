import { model, Schema } from "mongoose";

const schema = new Schema({
    title:{type: String, required: true },
    content:{type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true },
    publishedDate:{ type: Date, default: Date.now },
},{
    timestamps: {updatedAt: false},
    versionKey: false
   })

export const Book = model ("Book", schema)   
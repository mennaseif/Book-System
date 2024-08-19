import mongoose, { connect } from "mongoose";

export const dbconn =() =>{
    mongoose
 .connect (
    "mongodb://localhost:27017/books",
    {
    serverSelectionTimeoutMS:1000
    }
)
.then (() =>{
    console.log("connected successfully to the server")
})
}
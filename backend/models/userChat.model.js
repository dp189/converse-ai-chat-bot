import mongoose from "mongoose";


const UserChatSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    chats:[
        {
            _id: {
                type:String,
                required: true
            },
            title:{
                type: String,
                required: true
            },
            createdAt:{
                type:Date,
                dafault:Date.now()
            }

        }
    ]
})


export const UserChats = mongoose.model("UserChat", UserChatSchema);
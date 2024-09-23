import mongoose from "mongoose";


const ChatSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    history: [
        {
            role:{
                type: String,
                required: true,
                enum: ["user" , "model"]
            },
            parts:[
                {
                    text: {
                        type:String,
                        required:true
                    }
                }
            ],
            img:{
                type:String,
                required: false
            }
        }
    ]
}, {timestamps: true});

export const Chat = mongoose.model('Chat', ChatSchema);
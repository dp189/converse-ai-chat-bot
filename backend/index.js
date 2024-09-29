import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

import cors from "cors";
import path from "path";
import express, { application } from "express";
import ImageKit from "imagekit";
import connectDB from "./db/db.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Chat } from "./models/chat.model.js";
import { UserChats } from "./models/userChat.model.js";
import { ApiError } from "./utils/ApiError.js";

const port = process.env.PORT || 3000;

const app = express();


const __dirname = path.resolve();

app.use(
  cors({
    origin: [process.env.ORIGIN],
   
    credentials: true,
  })
);



//JSON header
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Clerk error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { text } = req.body;

    const newChat = new Chat({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text }],
        },
      ],
    });

    const savedChat = await newChat.save();

    const userChat = await UserChats.find({ userId: userId });

    if (!userChat.length) {
      const newUserChat = new UserChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChat.save();
      console.log(newUserChat);
    } else {
      await UserChats.updateOne(
        {
          userId: userId,
        },
        {
          $push: {
            chats: [
              {
                _id: savedChat._id,
                title: text.substring(0, 40),
              },
            ],
          },
        }
      );
    }

    res.status(201).send(newChat._id);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

app.get("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChats = await UserChats.find({ userId });
    if(userChats.length === 0) {
      return res.status(200).send({});
    }

    res.status(200).send(userChats[0].chats);
  } catch (error) {
    console.log(error);
    
  }
});

app.get("/api/chats/:id",ClerkExpressRequireAuth(), async (req, res) => {
  
    const userId = req.auth.userId;
  
  try {
    const chat = await Chat.findOne({ _id: req.params.id , userId});
    if(!chat){
      res.status(404).send("Chats Not Found");
      throw new ApiError(404, "Chats Not Found");
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat!");
    throw new ApiError(500, err.message);
  }
});


app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  const { question, answer, img } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, userId },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    
    res.status(500).send("Error adding conversation!");
    
  }
});


// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname, "/client/dist")));

//   app.get("*", (req,res) => {
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//   })
// }

app.listen(port, () => {
  connectDB();
  console.log(`Server is listening at port: ${port}`);
});

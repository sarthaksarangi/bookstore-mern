import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
const app = express();
import bookRoute from './routes/bookRoute.js'
import cors from 'cors'

//Middleware for parsing request body
app.use(express.json());

app.use(cors())
/*
 "CORS is a security feature for web browsers. 
 It's like a gatekeeper that decides if other websites can access the things (like data or services)
  on your website. It helps prevent unauthorized access from potentially harmful places while allowing good,
   safe websites to use your stuff."
*/
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],

// }))

app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/books',bookRoute)

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("app is connected to db");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((e) => {
    console.log(e);
  });

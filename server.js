const express = require("express");
const bodyParser=require('body-parser');

require("dotenv").config()

const mongoose = require('mongoose');

const app = express();

// const userRouter = require('./Routes/UserRoute');
const userRouter = require('./Routes/UserRoute');
const postRouter = require('./Routes/PostRoute');
const categoryRouter = require('./Routes/CategoryRoute');
const commentRouter = require('./Routes/CommentRoute');



(async () => {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_URL);
      console.log('Connected to MongoDB database');
      // Routes setup after the database connection is successful
      app.use(bodyParser.json())
      app.use("/api/user/v1",userRouter)
      app.use("/api/post/v1", postRouter);
      app.use("/api/category/v1", categoryRouter);
      app.use("/api/comment/v1", commentRouter);
      app.listen(process.env.PORT, () => {
        console.log("Server is running");
      });
    } catch (error) {
      console.error('Error connecting to MongoDB database:', error);
    }
  })();
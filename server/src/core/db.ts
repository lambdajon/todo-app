import mongoose from "mongoose";
// const MongooseCache = require('mongoose-redis');

mongoose.connect("mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
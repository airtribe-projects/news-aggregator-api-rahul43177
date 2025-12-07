require("dotenv").config(); 
const express = require('express');
const app = express();
const mongoose = require("mongoose")
const authRouter = require("./routes/userRouter");
const newsRouter = require("./routes/newsRouter"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Authentication Router
app.use("/users/" , authRouter);
//news Router
app.use("/" , newsRouter); 

// Skip MongoDB connection and server.listen during tests
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=> {
        console.log("The mongoDB database is connected")
    })
    .catch((error) => {
        console.log(error, "MongoDB connetion error"); 
    });

    app.listen(process.env.PORT , (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${process.env.PORT}`);
    });
}

module.exports = app;
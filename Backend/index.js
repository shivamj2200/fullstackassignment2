require('dotenv').config();

const express = require('express');
const app =  express();
const db = require('./config/db')
db();
// const routes = require('./routes/index.js')
const port = process.env.PORT;

// middleware to handle json object
app.use(express.json());
// middleware to handle url encoded form data object
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/index.js"));
// app.use('/api',routes);
app.use((req,res,next)=>{
    const error = new Error("This is not valid endpoitn");
    error.status = 404;
    next(error);
})

app.use((err,req,res,next)=>{
    res.status(err.status).json({error:err.message || "Something wenrt wrong "})
})
const server = app.listen(port, (err) => {
    if (err) {
      console.log(`Error in server listening :-${err}`);
      return;
    }
    console.log(`Server listening at http://localhost:${port}`);
  });
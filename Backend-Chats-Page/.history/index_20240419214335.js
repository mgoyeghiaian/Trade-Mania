import express from "express";

import connectDB from "./config/db.js";


connectDB();

const port = process.env.PORT || 6000;
const app = new express();








app.listen(port,
    () =>(
        console.log(`Server is tunning on PORT: ${port}`)
    )
);
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import AboutRoutes from "./Routes/AboutRoutes.js";
import UsersRoutes from './Routes/UsersRoutes.js'
import BuyRoutes from "./Routes/BuyRoutes.js";
import SlideRoutes from "./Routes/SlideshowRoutes.js"
import RentRoutes from "./Routes/RentRoutes.js";
import CartRoutes from "./Routes/CartRoutes.js";

dotenv.config();

connectDB();

const port = process.env.PORT || 6000;
const app = new express();








app.listen(port,
    () =>(
        console.log(`Server is tunning on PORT: ${port}`)
    )
);
import express from "express";
import dotenv from "dotenv";
import colors from 'colors';
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use(express.static('public'));
app.use('/images', express.static('images'));


app.use("/about", AboutRoutes)
app.use("/buy", BuyRoutes);
app.use("/user", UsersRoutes)
app.use("/slideshow", SlideRoutes)
app.use("/rent", RentRoutes)
app.use("/cart", CartRoutes)







app.listen(port,
    () =>(
        console.log(`Server is tunning on PORT: ${port}`)
    )
);
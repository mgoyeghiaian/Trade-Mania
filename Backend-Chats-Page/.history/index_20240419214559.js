import express from "express";
import dotenv from "dotenv";
import cors from "cors";



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
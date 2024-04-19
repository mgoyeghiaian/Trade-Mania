import express from "express";
import dotenv from "dotenv";
import cors from "cors";



dotenv.config();

connectDB();

const port = process.env.PORT || 6000;
const app = new express();

app.use(express.json());
app.use(cors())








app.listen(port,
    () =>(
        console.log(`Server is tunning on PORT: ${port}`)
    )
);
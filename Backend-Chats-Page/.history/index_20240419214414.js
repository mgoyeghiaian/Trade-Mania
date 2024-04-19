
dotenv.config();

connectDB();

const port = process.env.PORT || 6000;








app.listen(port,
    () =>(
        console.log(`Server is tunning on PORT: ${port}`)
    )
);
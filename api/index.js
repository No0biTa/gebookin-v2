import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import reviewRoutes from './routes/reviews.js';
import cors from "cors"; // Import the cors package
const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to MongoDB")
        // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }catch (error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})

// Middleware
app.use(cors({
    origin: 'https://gebookin.onrender.com', // Allow requests from your frontend domain
    credentials: true, // Allow cookies to be sent with requests
}));

app.use(cookieParser())
app.use(express.json())

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/hotels",hotelsRoute);
app.use("/api/v1/rooms",roomsRoute);
app.use("/api/v1/users",userRoute);
app.use("/api/v1/reviews", reviewRoutes);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


// app.get("/", (req,res)=>{
//     res.send("Hello first request!")
// })

app.listen(8800, ()=>{
    connect()
    console.log("Connected to Backend!")
});

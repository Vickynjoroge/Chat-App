//packages
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Routes
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

//Database connection
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();

app.use(express.json()); // to parse the incoming request with json payloads(from req.)
app.use(cookieParser())
const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
})
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configuration/connection.js";
import authRouter from "./routes/auth.js";
import weekRouter from "./routes/week.js";
import requireAuth from "./middleware/requireAuth.js";

dotenv.config({path:"./config.env"});

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set");
    process.exit(1);
}

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDist = path.join(__dirname, "../client/dist");

connectDB();

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
    res.json({ ok: true });
});

//auth
app.use("/api/auth", authRouter);

//week
app.use("/api/week", requireAuth, weekRouter);

// unknown api routes shouldn't fall through to the react app
app.use("/api", (req, res) => {
    res.status(404).json({ message: "Not found" });
});

// serve the built react app
app.use(express.static(clientDist));
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
});


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listing on port ${PORT}`);
    });
})

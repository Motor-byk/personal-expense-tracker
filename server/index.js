import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./configuration/connection.js";
import Week from "./model/Week.js";
import authRouter from "./routes/auth.js";
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
app.get("/api/week/:weekStart", requireAuth, async (req,res) => {
    try {
        const week = await Week.findOne({userId: req.userId, weekKey: req.params.weekStart});
        if (!week) {
            return res.status(404).json({message: "Week not found"});
        }

        res.status(200).json(week);
        console.log("Fetched week data");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// temp: creates a hardcoded week for the logged-in user
app.post("/api/week", requireAuth, async (req,res) => {
    try {
        const week = await Week.create({
            userId: req.userId,
            weekStart: new Date(2026, 8, 14),
            weekKey: "9-14-2026",
            startingBalance: 10000,
        })
        res.status(201).json(week)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Server error" });
    }
})

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

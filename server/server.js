import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./configuration/connection.js";
import User from "./model/User.js";
import Week from "./model/Week.js";

dotenv.config({path:"./config.env"});

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//users
app.get("/api/users/create", async(req, res) => {
    try {
        const savedUser = await User.create({email:"test@gmail.com", passwordHash: "testpasword", weeklyAllowance: 100});
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
app.get("/api/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json(user);
        console.log("Fetched user data");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



//week 
app.get("/api/week/:userId/:weekStart", async (req,res) => {
    try {
        const { userId, weekStart } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const week = await Week.findOne({userId: userId, weekKey: weekStart});
        if (!week) {
            return res.status(404).json({message: "Week not found"});
        }

        res.status(201).json({user, week});
        console.log("Fetched week data"); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });  
    }
});

app.get("/api/week/create", async (req,res) => {
    try {
        const week = await Week.create({
            userId: "6aadc94acca0ce64fec2f354",
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


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listing on port ${PORT}`);
    });
})




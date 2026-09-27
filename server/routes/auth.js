import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
};

function setAuthCookie(res, userId) {
    const token = jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

function publicUser(user) {
    const { passwordHash, ...rest } = user.toObject();
    return rest;
}

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (typeof email !== "string" || !email.includes("@")) {
            return res.status(400).json({ message: "A valid email is required" });
        }
        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({ email, passwordHash });

        setAuthCookie(res, user._id);
        res.status(201).json(publicUser(user));
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "An account with that email already exists" });
        }
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (typeof email !== "string" || typeof password !== "string") {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        setAuthCookie(res, user._id);
        res.status(200).json(publicUser(user));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token", cookieOptions);
    res.status(204).end();
});

router.get("/me", requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-passwordHash");
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;

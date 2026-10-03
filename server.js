require("dotenv").config();

const express = require("express");
const path = require("path");

const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Allow larger payload for saving photos/diary content
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve public folder
app.use(express.static(path.join(__dirname, "public")));

// Persistence directory
const DATA_DIR = path.join(__dirname, "data");
const DIARY_FILE = path.join(DATA_DIR, "diary.json");

if (!fs.existsSync(DATA_DIR)) {
    try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {
        console.warn("Could not create data directory:", e);
    }
}

// Password checking API with dual accounts
app.post("/api/unlock", (req, res) => {
    const enteredPassword = req.body.password;
    if (!enteredPassword) {
        return res.status(400).json({ success: false, message: "Password required" });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || process.env.SECRET_PASSWORD || "Haarsh20";
    const readerPassword = process.env.READER_PASSWORD || "sanu16";

    // 1. Check Editor / Admin Password
    if (enteredPassword === adminPassword) {
        return res.json({
            success: true,
            role: "editor",
            message: "Welcome Editor 👑"
        });
    }

    // 2. Check Reader Password
    if (enteredPassword === readerPassword) {
        return res.json({
            success: true,
            role: "reader",
            message: "Welcome Reader 📖"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Only for one girl ❤️"
    });
});

// GET Diary Data
app.get("/api/diary", (req, res) => {
    try {
        if (fs.existsSync(DIARY_FILE)) {
            const content = fs.readFileSync(DIARY_FILE, "utf-8");
            return res.json({
                success: true,
                data: JSON.parse(content)
            });
        }
        return res.json({
            success: true,
            data: null
        });
    } catch (err) {
        console.error("Failed to read diary file:", err);
        return res.status(500).json({
            success: false,
            message: "Could not read diary from server"
        });
    }
});

// POST Diary Data (Editor only)
app.post("/api/diary", (req, res) => {
    const editorKey = req.headers["x-editor-key"] || req.body.editorKey;
    const adminPassword = process.env.ADMIN_PASSWORD || process.env.SECRET_PASSWORD || "Haarsh20";

    if (!editorKey || editorKey !== adminPassword) {
        return res.status(403).json({
            success: false,
            message: "Forbidden: Only Editor can save diary changes."
        });
    }

    const diaryData = req.body.data || req.body;
    if (!diaryData) {
        return res.status(400).json({
            success: false,
            message: "No diary data provided"
        });
    }

    try {
        fs.writeFileSync(DIARY_FILE, JSON.stringify(diaryData, null, 2), "utf-8");
        return res.json({
            success: true,
            message: "Diary saved to server successfully! ❤️"
        });
    } catch (err) {
        console.error("Failed to write diary file:", err);
        return res.status(500).json({
            success: false,
            message: "Could not save diary to server"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log("Private website running!");
    console.log("Open: http://localhost:" + PORT);
});


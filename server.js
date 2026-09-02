require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve public folder

app.use(express.static(path.join(__dirname, "public")));

// Password checking API

app.post("/api/unlock", (req, res) => {


const password = req.body.password;


if (password === process.env.SECRET_PASSWORD) {

    return res.json({
        success: true
    });

}


return res.status(401).json({
    success: false,
    message: "Only for one girl ❤️"
});


});

// Start server

app.listen(PORT, () => {


console.log("Private website running!");
console.log("Open: http://localhost:" + PORT);


});

const fs = require('fs');
const path = require('path');

const src = "C:/Users/Harssh Acharya/.gemini/antigravity/brain/434b40c7-37b4-4f3f-9c62-07367e887961/.user_uploaded/uploaded_media_1793601551832.mp3";
const dest = path.join(__dirname, 'public', 'romantic-music.mp3');

try {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log("Successfully copied romantic music to public/romantic-music.mp3! ❤️");
    } else {
        console.warn("Source audio file not found at:", src);
    }
} catch (e) {
    console.error("Error copying audio file:", e);
}


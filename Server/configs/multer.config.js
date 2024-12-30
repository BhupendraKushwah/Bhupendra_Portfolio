const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the dynamic folder path
        const uploadPath = path.join(__dirname, '../uploads');

        // Check if the folder exists
        if (!fs.existsSync(uploadPath)) {
            // Create the folder if it doesn't exist
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        console.log('Upload path:', uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Save the file with its original name
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Multer upload instance
const upload = multer({
    storage,
    limits: {
        fieldSize: 10 * 1024 * 1024, // 10 MB field size limit
        fileSize: 50 * 1024 * 1024  // 50 MB file size limit for uploads
    }
});

module.exports = upload;

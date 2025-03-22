import multer from "multer";

// Configure storage (store files in memory)
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, callback) => {
    if (req.path.includes("/upload-forms")) {
        // Only allow PDFs for form uploads
        if (file.mimetype === "application/pdf") {
            callback(null, true);
        } else {
            callback(new Error("Only PDF files are allowed for forms"), false);
        }
    } else {
        // Allow only images for other routes
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else {
            callback(new Error("Only image files are allowed"), false);
        }
    }
};

// Set up Multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;

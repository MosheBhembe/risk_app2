const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp4|mov|avi|mkv|pdf|doc|docx|xlsx|pptx|jpg|jpeg|png/;
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only video, document, or image files are allowed'), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024
    }
});

module.exports = upload; 
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const fileSize = 2000000;

const storage = multer.diskStorage({
    destination: (request, file, callback) =>
        callback(null, path.join(__dirname, "uploads")),
    filename: (request, file, callback) =>
        uidSafe(24).then((uid) =>
            callback(null, `${uid}${path.extname(file.originalname)}`)
        ),
});

const uploader = multer({
    storage,
    limits: {
        fileSize,
    },
});

module.exports = {
    uploader,
};

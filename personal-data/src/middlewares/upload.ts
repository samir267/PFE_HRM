// middleware/upload.js
const multer = require('multer');
const { storage: cloudinaryStorage } = require('../config/cloudinaryStorage');

const upload = multer({ storage: cloudinaryStorage });

module.exports = upload;

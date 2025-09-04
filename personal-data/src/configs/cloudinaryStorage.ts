// config/cloudinaryStorage.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('./cloudinary.config');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mon_projet_upload', // dossier sur Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  },
});

module.exports = { storage };

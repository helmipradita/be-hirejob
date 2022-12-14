const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portofolio',
  },
});

let maxSize = 1024 * 1024 * 2;
const uploadPortofolio = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext == '.jpg' || ext == '.png' || ext == '.jpeg') {
      cb(null, true);
    } else {
      //cb(null, false)
      //return cb (new Error ('only jpg or png'))
      cb({ message: 'file not support' }, false);
    }
  },
  limits: { fileSize: maxSize },
});

module.exports = { uploadPortofolio };

import multer from 'multer';
import { StatusCode } from '../interface/StatusCode.js'; // Update with your StatusCode location

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

export const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(StatusCode.BadRequest).json({ 
          message: 'File size exceeds the limit of 5MB.' 
        });
      }
      return res.status(StatusCode.BadRequest).json({ 
        message: err.message 
      });
    } else if (err) {
      return res.status(StatusCode.BadRequest).json({ 
        message: err.message 
      });
    }
    next();
  });
};

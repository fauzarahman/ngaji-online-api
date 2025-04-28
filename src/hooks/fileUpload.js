// src/hooks/fileUpload.js
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadFolder = path.resolve('uploads');

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('file'); // <--- nama field harus 'file'

export const fileUpload = () => {
    return async context => {
      const { req, res } = context.params;

      console.log('[HOOK] params', Object.keys(context.params));
        console.log('[HOOK] context.params.req?', !!context.params.req);
        console.log('[HOOK] context.params.res?', !!context.params.res);
  
      if (!req || !res) {
        throw new Error('File upload hanya didukung melalui HTTP requests');
      }
  
      await new Promise((resolve, reject) => {
        upload(req, res, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
  
      context.data = {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };
  
      return context;
    }
}
  
  
  

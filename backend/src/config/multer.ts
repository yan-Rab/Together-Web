import multer, {FileFilterCallback} from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';

interface File{
    
    mimetype: string,
}

const multerConfig = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','temp','uploads'),
        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(10).toString('hex');
            const fileName = `${hash}-${file.originalname}`;
            callback(null, fileName);
        }
    }),

    limits: {
        fileSize: 4 * 1024 * 1024
    },

    fileFilter: (request: Request, file: File, callback: FileFilterCallback) => {
        const AllMimeTypes = [
            'image/png',
            'image/jpg',
            'image/gif',
            'image/jpeg',
            'image/pjpeg',
            
        ]

        if(AllMimeTypes.includes(file.mimetype)){
            callback(null, true);
        }else{
            callback(new Error('Image type invalid!'))
        }
    }
}

export default multerConfig;
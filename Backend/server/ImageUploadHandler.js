import multer from "multer"
import path from 'path';

export default class ImageUploadHandler {

   static getStorage(){
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.normalize('Backend/server/public/ProfilePics'));
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        })
   }
}
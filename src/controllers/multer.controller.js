import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../public/image');
    },
    filename: (req, file, callback) => {
        console.log(file);
        callback(null, Date.now() + '-' + file.fieldname + file.originalname);
    }
})

const upload = multer({ storage: storage})

export default upload
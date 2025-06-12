import express from 'express';
const fileRouter = express.Router();
import { upload } from '../middlewares/multer.middleware.js';
import { uploadFile, listFile, getFileData } from '../controllers/file.controller.js';
import auth from "../middlewares/auth.middleware.js"

fileRouter.post('/upload', upload.single('file'), auth, uploadFile);
fileRouter.get('/list',  listFile);
fileRouter.post('/get', getFileData);


export default fileRouter;
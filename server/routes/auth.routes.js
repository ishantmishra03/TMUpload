import express from 'express';
const authRouter = express.Router();
import { login, isAuthenticated, logout } from "../controllers/auth.controller.js";
import auth from '../middlewares/auth.middleware.js';

authRouter.post('/', login);
authRouter.post('/logout', auth, logout);
authRouter.get('/isAuth', auth, isAuthenticated);

export default authRouter;
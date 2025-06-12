import express from 'express';
const app = express();
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.config.js';
await connectDB();

import authRouter from "./routes/auth.routes.js";
import fileRouter from "./routes/file.routes.js";


const allowedOrigins = [
    'http://localhost:5173',
    process.env.VITE_FRONTEND_URL,
];


const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRouter);
app.use('/api/file', fileRouter);

app.get('/', (req, res) => { res.send("Working...") });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) });
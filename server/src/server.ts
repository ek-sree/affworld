import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import { connectToDatabase } from '../src/database/mongodb.js';
import authRouter from './app/router/authRouter.js';
import session from 'express-session'
import cookieParser from 'cookie-parser'

const app = express()

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');  
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); 
    next();
  });

app.use(express.json())

app.use(session({
    secret: config.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(cors({
    origin: config.CORS_KEY, 
    credentials: true,              
    methods: ["POST", "GET", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(cookieParser());

app.use('/api/auth', authRouter)

await connectToDatabase()

const PORT = config.port

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
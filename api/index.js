import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then( () => {
    console.log("MongoDB is connected successfully");
    })
.catch( (err) => {
    console.log(err);   
    });

    
const app = express();


app.use(express.json());
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// test api 
app.use('/api/user', userRoutes);

//signup
app.use('/api/auth', authRoutes);

//middle ware to handle error that we get frmo the input
app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        res.status(statusCode).json(
            {
            success: false,
            statusCode,
            message
        });
});
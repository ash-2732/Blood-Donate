import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';

// load env variables
dotenv.config();

// connect to db
connectDB();


// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));     // log requests to the console

// set up a route
app.get('/', (req, res) => {
    res.send('Hi i am a rest hahahaha');
});
// set port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white);
});



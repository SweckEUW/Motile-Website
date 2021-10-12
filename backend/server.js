import connectDB from './config/db.js'
import userRoutes from './routes/userRoute.js'
import express from 'express'
import dotenv  from 'dotenv'

connectDB()

dotenv.config({ path: "../.env" });

const app = express();

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

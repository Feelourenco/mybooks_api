import express from "express";
import userRoutes from './routes/userRoutes';
import bookRoutes from "./routes/bookRoutes";


const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/book', bookRoutes);


export default app;
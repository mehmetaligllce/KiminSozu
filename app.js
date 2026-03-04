import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import main from './routes/main.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch (e) {
        console.log(e);
    }
}
connectDB();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', main)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
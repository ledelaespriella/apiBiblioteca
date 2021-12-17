import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import BookRoutes from './routes/book.routes';
import UserRoutes from './routes/user.routes';

dotenv.config();
const app = express();

const main = async () => {
    //settings
    await mongoose.connect(process.env.URL_DB)
        .then(() => { console.log('app connect to db') });

    app.listen(process.env.PORT, () => {
        console.log(`app listening at port ${process.env.PORT}`)
    });

    //middleware
    app.use(express.json());
    app.use(cors());

    // app.get('/', (req, res) => {
    //     res.send('Hola mundo');
    // });

    // rutas
    app.use('/api', BookRoutes);
    app.use('/api', UserRoutes);

    //static files
    app.use(express.static(path.join(__dirname, 'public')));



};

main().catch(err => console.log(err));






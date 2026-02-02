import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/error.middleware.js';

class App {
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    initializeRoutes() {
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'OK', message: 'Server is running' });
        });

        this.app.use('/api/v1/auth', authRoutes);
        this.app.use('/api/v1/books', bookRoutes);

        // Global Error Handler
        this.app.use(errorHandler);
    }
}

export default new App().app;

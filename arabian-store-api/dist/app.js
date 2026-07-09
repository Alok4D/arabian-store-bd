import express, {} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
const app = express();
// Security and utility middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
// Serve static files (like uploaded images)
app.use(express.static('public'));
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'API is running smoothly' });
});
// API Routes
app.use('/api', routes);
// Error handling middleware
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
import express from 'express';
import cors from 'cors';
import path from 'path';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';
import orderRoutes from './routes/orders.js';
import utilRoutes from './routes/utils.js';
import uploadRoutes from './routes/uploadRoutes.js';
import customerRoutes from './routes/customers.js';
import settingsRoutes from './routes/settings.js';

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
    'http://localhost:5173',
    'http://localhost:5174'
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

// API Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Serve static files from 'public' folder
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));


// Main App Routes
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Pochampally APIs" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/utils", utilRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/settings", settingsRoutes);

export default app;

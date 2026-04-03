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

app.use(cors());
app.use(express.json());

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

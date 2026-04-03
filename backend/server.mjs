import dotenv from 'dotenv';
dotenv.config();

import app from './app.mjs';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
});

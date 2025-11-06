import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
import router from './routes.js';

const __dirname = path.resolve();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "frontend")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use('/game', router);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
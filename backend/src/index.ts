import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de E-commerce');
});

// ...otras rutas y lógica del backend...

app.listen(port, () => {
    console.log(`Servidor backend escuchando en el puerto ${port}`);
});

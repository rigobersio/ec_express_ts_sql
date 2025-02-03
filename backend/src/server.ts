import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mainRouter from './routes/mainRouter';

const URL = process.env.FRONTEND_URL;
const server = express();

server.use(cors({
  origin: URL,
  credentials: true,
}));

server.use(morgan('dev'));
server.use(express.json());

server.use(mainRouter);

server.get('/', (req, res) => {
  res.send('API de E-commerce');
});

export default server;
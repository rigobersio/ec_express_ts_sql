import express from 'express';
import morgan from 'morgan';
import cors from 'cors';


//import authRoutes from "./routes/auth.routes.js";
//import --Routes from "./routes/tasks.routes.js";


const URL = process.env.FRONTEND_URL;
const app = express();
app.use(cors({
  origin: URL,
  credentials: true,
  //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
}));



app.use(morgan('dev'));
app.use(express.json());
//app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API de E-commerce');
  });



export default app;

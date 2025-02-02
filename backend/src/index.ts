import express from 'express';
import server from './server';

const app = express();
const port = process.env.PORT || 3000;

app.use(server);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

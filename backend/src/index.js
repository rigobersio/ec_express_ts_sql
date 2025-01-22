import 'dotenv/config';
import app from './App.js';



const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });


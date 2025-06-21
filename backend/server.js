import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
//npx nodemon server.js

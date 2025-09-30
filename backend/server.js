import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('server is working'));

app.listen(PORT, () => {
  console.log(`Server is running on: ${BASE_URL}`);
});

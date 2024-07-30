import http from 'http';
import cors  from 'cors';
import express from 'express';

import { weatherRoutes } from './routes/weather.route';

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use('/api', weatherRoutes);

export { app, server};
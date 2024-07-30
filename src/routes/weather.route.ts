import { Router } from 'express';
import { createPlace, getPlace } from '../controllers/weather.controller';

const weatherRoutes = Router();

weatherRoutes.get('/place', getPlace);
weatherRoutes.post('/place', createPlace);

export { weatherRoutes };
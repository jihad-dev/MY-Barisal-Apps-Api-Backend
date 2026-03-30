import express from 'express';
import { NewsController } from './news.controller';

const router = express.Router();

router.get('/', NewsController.getAllNews);
router.post('/create-news', NewsController.createNews);

export const NewsRoutes = router;
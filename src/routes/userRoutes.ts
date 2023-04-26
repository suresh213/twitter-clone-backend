import { Router } from 'express';
import TweetController from '../controllers/Tweet.controller';
import UserController from '../controllers/User.controller';
import authMiddleWare from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleWare, UserController.getUserDetails);

router.get('/tweet', authMiddleWare, TweetController.getTweets);
router.post('/tweet', authMiddleWare, TweetController.createTweet);

export default router;

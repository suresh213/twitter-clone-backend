import { Router } from 'express';
import UserController from '../controllers/User.controller';
import TweetController from '../controllers/Tweet.controller';
import authMiddleWare from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleWare, UserController.getUserDetails);

router.get('/tweet', authMiddleWare, TweetController.getTweets);
router.post('/tweet', authMiddleWare, TweetController.createTweet);
router.put('/tweet/:id', authMiddleWare, TweetController.updateTweet);
router.delete('/tweet/:id', authMiddleWare, TweetController.deleteTweet);

export default router;

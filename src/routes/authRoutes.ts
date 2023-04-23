import { Router } from 'express';

import UserController from '../controllers/User.controller';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router;

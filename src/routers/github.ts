import { Router } from 'express';
import auth from '../middlewares/github-auth';

const router = Router();

router.get('/authorize',  auth.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/callback',  auth.authenticate('github', { successRedirect: '/users/dashboard', failureRedirect: '/guests' }));

export default router;
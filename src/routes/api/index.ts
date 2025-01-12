import { Router } from 'express';
import {userRouter} from './userRoutes.js';
import { friendRouter } from './friendRoutes.js';
import { reactionRouter } from './reactionRoutes.js';
import { thoughtRouter } from './thoughtRoutes.js';


const router = Router();


router.use(friendRouter);
router.use(userRouter);
router.use(reactionRouter);
router.use(thoughtRouter);

export {router as apiRouter};
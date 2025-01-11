import { Router } from 'express';
import {userRouter} from './userRoutes';
import { friendRouter } from './friendRoutes';
import { reactionRouter } from './reactionRoutes';
import { thoughtRouter } from './thoughtRoutes';


const router = Router();


router.use(friendRouter);
router.use(userRouter);
router.use(reactionRouter);
router.use(thoughtRouter);

export {router as apiRouter};
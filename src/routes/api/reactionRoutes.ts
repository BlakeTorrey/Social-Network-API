import { Router } from 'express';
import {
    addReaction,
    removeReaction
} from '../../controllers/reactionController';

const router = Router();

router.route('/thoughts/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

export { router as reactionRouter};
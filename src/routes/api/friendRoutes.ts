import { Router } from 'express';
import {
    addFriend,
    removeFriend
} from '../../controllers/friendController';

const router = Router();

router.route('/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

export { router as friendRouter };
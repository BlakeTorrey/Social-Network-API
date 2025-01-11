import { Router } from 'express';
import {
   getAllUsers,
   getSingleUser,
   createUser,
   deleteUser,
   updateUser
} from '../../controllers/userController';


const router = Router();

router.route('/users')
    .get(getAllUsers)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/users/:userId').get(getSingleUser);

export { router as userRouter };
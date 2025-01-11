import { Router } from 'express';
import {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController';


const router = Router();

router.route('/thoughts')
    .get(getAllThoughts)
    .post(createThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/thoughts/:thoughtId')
    .get(getSingleThought);


export { router as thoughtRouter};
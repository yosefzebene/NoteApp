import { Router } from "express";
import auth from '../middleware/auth.js';
import * as usersController from '../controllers/usersController.js';

const usersRoutes = Router();

usersRoutes.route('/me/notes')
    .get([auth], usersController.getAllNotes)
    .post([auth], usersController.createNote)

usersRoutes.route('/me/notes/:id')
    .get([auth], usersController.getSingleNote)
    .patch([auth], usersController.modifyNote)
    .delete([auth], usersController.deleteNote)

export default usersRoutes;

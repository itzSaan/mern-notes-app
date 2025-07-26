import express from 'express';
import { createNote, deleteNote, getAllNotes, getSingleNote, getAllTags, updateNote } from '../controllers/notesController.js';
import userAuth from '../middleware/userAuth.js';

const notesRouter = express.Router();

notesRouter.get('/all-notes',userAuth, getAllNotes);
notesRouter.get('/note-:id',userAuth, getSingleNote);
notesRouter.post('/new-note', userAuth, createNote);
notesRouter.put('/:id', userAuth, updateNote);
notesRouter.delete('/:id', userAuth, deleteNote);
notesRouter.get('/get-all-tags', userAuth, getAllTags);


export default notesRouter;
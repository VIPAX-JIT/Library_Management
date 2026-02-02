import express from 'express';
import bookController from '../controllers/BookController.js';
import { validate, createBookSchema, updateBookSchema } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.route('/')
    .get(bookController.getAllBooks)
    .post(validate(createBookSchema), bookController.createBook);

router.route('/:id')
    .get(bookController.getBook)
    .put(validate(updateBookSchema), bookController.updateBook)
    .delete(bookController.deleteBook);

export default router;

import { Router } from "express";
import BookController from "../controllers/BookController";

const bookRoutes = Router();
const bookController = new BookController();

bookRoutes.post('/register', bookController.register);
bookRoutes.get('/mybooks', bookController.getAllUserBooks);
bookRoutes.get('/mybook/:bookId', bookController.getBook);

export default bookRoutes;
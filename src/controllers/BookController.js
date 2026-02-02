import bookService from '../services/BookService.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/utils.js'; // Ensure correct import path for asyncHandler

class BookController {
    constructor() {
        this.service = bookService;
    }

    createBook = asyncHandler(async (req, res, next) => {
        const book = await this.service.createBook(req.body);
        res.status(201).json(new ApiResponse(201, book, 'Book created successfully'));
    });

    getAllBooks = asyncHandler(async (req, res, next) => {
        const result = await this.service.getAllBooks(req.query);
        res.status(200).json(new ApiResponse(200, result.data, 'Books retrieved successfully'));
    });

    getBook = asyncHandler(async (req, res, next) => {
        const book = await this.service.getBookById(req.params.id);
        res.status(200).json(new ApiResponse(200, book));
    });

    updateBook = asyncHandler(async (req, res, next) => {
        const book = await this.service.updateBook(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, book, 'Book updated successfully'));
    });

    deleteBook = asyncHandler(async (req, res, next) => {
        await this.service.deleteBook(req.params.id);
        res.status(204).json(new ApiResponse(204, null, 'Book deleted successfully'));
    });
}

export default new BookController();

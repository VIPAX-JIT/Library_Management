import bookRepository from '../repositories/BookRepository.js';
import AppError from '../utils/AppError.js';

class BookService {
    constructor() {
        this.repository = bookRepository;
    }

    async createBook(data) {
        const existingBook = await this.repository.findByIsbn(data.isbn);
        if (existingBook) {
            throw new AppError('Book with this ISBN already exists', 400);
        }
        return await this.repository.create(data);
    }

    async getAllBooks(query) {
        // Advanced Filtering, Sorting, Pagination Logic

        // 1. Filtering
        const queryObj = { ...query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);

        // Advanced filtering (gte, gt, lte, lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let filter = JSON.parse(queryStr);

        // Search implementation
        if (query.search) {
            filter.$text = { $search: query.search };
        }

        // 2. Sorting
        let sort = '-createdAt';
        if (query.sort) {
            sort = query.sort.split(',').join(' ');
        }

        // 3. Pagination
        const page = query.page * 1 || 1;
        const limit = query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        const books = await this.repository.findAll(filter, sort, skip, limit);
        const total = await this.repository.count(filter);

        return {
            results: books.length,
            total,
            data: books
        };
    }

    async getBookById(id) {
        const book = await this.repository.findById(id);
        if (!book) {
            throw new AppError('No book found with that ID', 404);
        }
        return book;
    }

    async updateBook(id, data) {
        const book = await this.repository.update(id, data);
        if (!book) {
            throw new AppError('No book found with that ID', 404);
        }
        return book;
    }

    async deleteBook(id) {
        const book = await this.repository.delete(id);
        if (!book) {
            throw new AppError('No book found with that ID', 404);
        }
        return null;
    }
}

export default new BookService();

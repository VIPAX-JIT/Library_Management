import BaseRepository from './BaseRepository.js';
import Book from '../models/Book.js';

class BookRepository extends BaseRepository {
    constructor() {
        super(Book);
    }

    // Override delete for Soft Delete
    async delete(id) {
        return await this.model.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }

    async findByIsbn(isbn) {
        return await this.model.findOne({ isbn });
    }
}

export default new BookRepository();

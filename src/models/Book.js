import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A book must have a title'],
        trim: true,
        maxlength: [100, 'A book title must have less or equal then 100 characters']
    },
    author: {
        type: String,
        required: [true, 'A book must have an author'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'A book must have an ISBN'],
        unique: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        required: [true, 'A book must have a published year']
    },
    genre: {
        type: String,
        required: [true, 'A book must have a genre'],
        trim: true
    },
    copies: {
        type: Number,
        default: 1,
        min: [0, 'Copies cannot be negative']
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for search
bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

// Query Middleware for Soft Delete
// Query Middleware for Soft Delete
bookSchema.pre(/^find/, function () {
    this.where({ isDeleted: { $ne: true } });
});

const Book = mongoose.model('Book', bookSchema);

export default Book;

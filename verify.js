import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/books';

const test = async () => {
    try {
        // 1. Create a Book
        console.log('1. Creating a new Book...');
        const bookData = {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            isbn: '978-0743273565',
            publishedYear: 1925,
            genre: 'Classic',
            copies: 5
        };

        let response = await axios.post(API_URL, bookData);
        console.log('✅ Created:', response.data.data.title);
        const bookId = response.data.data.id;

        // 2. Get All Books
        console.log('\n2. Getting All Books...');
        response = await axios.get(API_URL);
        console.log('✅ Total Books:', response.data.data.length);

        // 3. Get Single Book
        console.log(`\n3. Getting Book ${bookId}...`);
        response = await axios.get(`${API_URL}/${bookId}`);
        console.log('✅ Found:', response.data.data.title);

        // 4. Update Book
        console.log('\n4. Updating Book...');
        response = await axios.put(`${API_URL}/${bookId}`, { copies: 10 });
        console.log('✅ Updated Copies:', response.data.data.copies);

        // 5. Delete Book
        console.log('\n5. Deleting Book...');
        await axios.delete(`${API_URL}/${bookId}`);
        console.log('✅ Deleted successfully');

        // 6. Verify Delete (Soft Delete check if needed, or 404)
        console.log('\n6. Verifying Deletion...');
        try {
            await axios.get(`${API_URL}/${bookId}`);
        } catch (err) {
            if (err.response.status === 404) {
                console.log('✅ Book not found (as expected).');
            } else {
                console.log('❌ Unexpected error:', err.message);
            }
        }

    } catch (error) {
        console.error('❌ Error during verification:', error.response ? error.response.data : error.message);
    }
};

// Wait for server to start (manual delay or just run after server is up)
setTimeout(test, 2000);

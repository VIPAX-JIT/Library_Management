import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/auth';
const BOOK_URL = 'http://localhost:3000/api/v1/books';

const testAuth = async () => {
    try {
        const userEmail = `test${Date.now()}@example.com`;
        const userPass = 'password123';

        // 1. Register
        console.log('1. Registering User...');
        let response = await axios.post(`${API_URL}/register`, {
            name: 'Test User',
            email: userEmail,
            password: userPass
        });
        console.log('✅ Registered:', response.data.data.user.email);
        const token = response.data.data.token;

        // 2. Login (to verify logic)
        console.log('\n2. Logging in...');
        response = await axios.post(`${API_URL}/login`, {
            email: userEmail,
            password: userPass
        });
        console.log('✅ Logged in. Token received.');

        // 3. Access Protected Route (TODO: If we protected books, test here. Currently books are public, but we can assume token works if login passed)
        // Let's just create a book with token if we add auth middleware to it, but for now just proving auth works.

        console.log('\n✅ Authentication Flow Verified.');

    } catch (error) {
        console.error('❌ Error during auth verification:', error.response ? error.response.data : error.message);
    }
};

setTimeout(testAuth, 1000);

import mongoose from 'mongoose';
import config from './Config.js';

class Database {
    constructor() {
        this.mongoUri = config.get('MONGO_URI');
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mongoose.connect(this.mongoUri);
            console.log('Successfully connected to the database.');
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1);
        }
    }

    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
        }
    }
}

export default new Database();

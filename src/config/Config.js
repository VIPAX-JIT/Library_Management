import dotenv from 'dotenv';

dotenv.config();

class Config {
  constructor() {
    this.PORT = process.env.PORT || 3000;
    this.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library_db';
    this.NODE_ENV = process.env.NODE_ENV || 'development';
  }

  get(key) {
    return this[key];
  }
}

export default new Config();

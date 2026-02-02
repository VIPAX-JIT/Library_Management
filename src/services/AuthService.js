import jwt from 'jsonwebtoken';
import userRepository from '../repositories/UserRepository.js';
import AppError from '../utils/AppError.js';
import config from '../config/Config.js';

class AuthService {
    constructor() {
        this.repository = userRepository;
    }

    signToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
            expiresIn: process.env.JWT_EXPIRES_IN || '90d'
        });
    }

    async register(data) {
        const existingUser = await this.repository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }
        const user = await this.repository.create(data);
        const token = this.signToken(user._id);
        user.password = undefined; // Sanitize
        return { user, token };
    }

    async login(email, password) {
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        const user = await this.repository.findByEmail(email);
        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new AppError('Incorrect email or password', 401);
        }

        const token = this.signToken(user._id);
        user.password = undefined;
        return { user, token };
    }
}

export default new AuthService();

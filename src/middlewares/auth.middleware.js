import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';
import userRepository from '../repositories/UserRepository.js';
import asyncHandler from '../utils/utils.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');

    const currentUser = await userRepository.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer does exist.', 401));
    }

    req.user = currentUser;
    next();
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};

export { protect, restrictTo };

import authService from '../services/AuthService.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/utils.js';

class AuthController {
    constructor() {
        this.service = authService;
    }

    register = asyncHandler(async (req, res, next) => {
        const { user, token } = await this.service.register(req.body);
        res.status(201).json(new ApiResponse(201, { user, token }, 'User registered successfully'));
    });

    login = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;
        const { user, token } = await this.service.login(email, password);
        res.status(200).json(new ApiResponse(200, { user, token }, 'Login successful'));
    });
}

export default new AuthController();

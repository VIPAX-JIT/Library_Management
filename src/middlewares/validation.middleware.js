import Joi from 'joi';

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({
            status: 'fail',
            message
        });
    }
    next();
};

const createBookSchema = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: Joi.string().required(),
    copies: Joi.number().integer().min(0).default(1)
});

const updateBookSchema = Joi.object({
    title: Joi.string().max(100),
    author: Joi.string(),
    isbn: Joi.string(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()),
    genre: Joi.string(),
    copies: Joi.number().integer().min(0)
}).min(1);

export { validate, createBookSchema, updateBookSchema };

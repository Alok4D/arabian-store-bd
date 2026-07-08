import { ZodError } from 'zod';
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ success: false, errors: error.issues });
                return;
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validate.middleware.js.map
import {} from 'express';
import jwt from 'jsonwebtoken';
export const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Unauthorized. No token provided.' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ success: false, message: 'Unauthorized. Malformed token.' });
            return;
        }
        const secretKey = process.env.JWT_SECRET ? String(process.env.JWT_SECRET) : 'fallback_secret_key_for_dev_only';
        const decoded = jwt.verify(token, secretKey);
        req.admin = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized. Invalid token.' });
    }
};
//# sourceMappingURL=auth.middleware.js.map
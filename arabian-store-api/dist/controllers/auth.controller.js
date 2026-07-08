import {} from 'express';
import { prisma } from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }
        const admin = await prisma.admin.findUnique({
            where: { email },
        });
        if (!admin) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';
        const token = jwt.sign({ id: admin.id, email: admin.email }, jwtSecret, { expiresIn: '1d' });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            admin: {
                id: admin.id,
                email: admin.email,
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
//# sourceMappingURL=auth.controller.js.map
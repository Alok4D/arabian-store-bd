import { type Request, type Response, type NextFunction } from 'express';
export interface AuthRequest extends Request {
    admin?: {
        id: string;
        email: string;
    };
}
export declare const authenticateAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map
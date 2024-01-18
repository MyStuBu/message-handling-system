import express, { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: number;
}

class Authorize {
    public authorize: express.RequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => {
        const token: string | undefined = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const decodedToken: string | JwtPayload = jwt.verify(token, process.env.SECRET_KEY || '');
            req.userId = (decodedToken as { userId: number }).userId;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
}

export default Authorize;

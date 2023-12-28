import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthService {
    public extractUserCredentials(body: any): { username: string; password: string } {
        const { username, password } = body;
        return { username, password };
    }

    public async hashUserPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    public async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public signJwtToken(userId: bigint): string {
        return jwt.sign({ userId: userId }, process.env.SECRET_KEY || '', {
            expiresIn: '1h',
        });
    }
}

export default AuthService;

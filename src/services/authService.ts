import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const extractUserCredentials = (body: any): { username: string; password: string } => {
    const {username, password} = body;
    return {username, password};
};

const hashUserPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

const validatePassword = async (password: string, validatePassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, validatePassword);
}

const signJwtToken = (userId: bigint): string => {
    return jwt.sign({userId: userId}, process.env.SECRET_KEY || '', {
        expiresIn: '1h',
    })
}

export default {
    extractUserCredentials,
    hashUserPassword,
    validatePassword,
    signJwtToken
}
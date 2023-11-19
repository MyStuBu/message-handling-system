import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/User';

const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body
        const hashPassword: string = await bcrypt.hash(password, 10)

        const user: User = await User.create({
            username: username,
            password: hashPassword
        })

        res.json(user);
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const {username, password} = req.body;

        const user: User | null = await User.findOne({where: {username}});
        if (!user) {
            return res.status(401).json({error: `User with ${username} not found`})
        }

        const isValidPassword: boolean = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({error: 'Invalid password'})
        }

        const token: string = jwt.sign({userId: user.id}, process.env.SECRET_KEY || '', {
            expiresIn: '1h',
        });

        res.json({token})
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


export default {
    registerUser,
    loginUser
}
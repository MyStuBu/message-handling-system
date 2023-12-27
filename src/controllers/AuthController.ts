import {Request, Response} from 'express';
import User from '../models/User';
import userService from "../services/userService";
import authService from "../services/authService";

const authUser = async (req: Request, res: Response): Promise<void> => {
    try {
        fetch()
    }
}

const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const {username, password} = authService.extractUserCredentials(req.body);
        const user: User | null = await userService.findUserInDatabase(username)
        if (!user) {
            return res.status(401).json({error: `User with ${username} not found`})
        }

        const isValidPassword: boolean = await authService.validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({error: 'Invalid password'})
        }

        const token: string = authService.signJwtToken(user.id);
        res.json({token})
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}


export default {
    authUser,
    loginUser
}
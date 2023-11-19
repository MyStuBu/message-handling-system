import {Request, Response} from 'express';
import User from '../models/User';

// Get all users
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const allUsers: User[] = await User.findAll();
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

// Get a specific user by ID
const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.id);

    try {
        const user: User | null = await User.findByPk(userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

// Update a user by ID
const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.id);
    const {username} = req.body;

    try {
        const [updatedRows] = await User.update({username}, {where: {id: userId}});

        if (updatedRows > 0) {
            const updatedUser: User | null = await User.findByPk(userId);
            res.json(updatedUser);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

// Delete a user by ID
const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.id);

    try {
        const deletedRows: number = await User.destroy({where: {id: userId}});

        if (deletedRows > 0) {
            res.json({message: 'User deleted successfully'});
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export default {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};

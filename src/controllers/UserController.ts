import {Request, Response} from 'express';
import User from '../models/User';

// Get all users
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

// Get a specific user by ID
const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);

    try {
        const user = await User.findByPk(userId);

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

// Create a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
    const {username} = req.body;

    if (username) {
        try {
            const newUser = await User.create({username});
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    } else {
        res.status(400).json({message: 'Username is required'});
    }
};

// Update a user by ID
const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);
    const {username} = req.body;

    try {
        const [updatedRows] = await User.update({username}, {where: {id: userId}});

        if (updatedRows > 0) {
            const updatedUser = await User.findByPk(userId);
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
    const userId = parseInt(req.params.id);

    try {
        const deletedRows = await User.destroy({where: {id: userId}});

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
    createUser,
    updateUserById,
    deleteUserById,
};

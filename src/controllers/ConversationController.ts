import {Request, Response} from "express";

const chat = async (req: Request, res: Response): Promise<any> => {
    const {message} = req.body

    res.status(200).json({
        message: 'This would be a response from the chatbot',
    })
}


export default {
    chat
};
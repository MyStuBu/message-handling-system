import express from "express";

const ConversationRouter = express.Router();
import ConversationController from '../controllers/ConversationController'

// Routes
ConversationRouter.post('/', ConversationController.chat);

export default ConversationRouter;

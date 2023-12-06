import express, {Router} from "express";

const ConversationRouter: Router = express.Router();
import ConversationController from '../controllers/ConversationController'

// Routes
ConversationRouter.post('/chat', ConversationController.llmCommunication);

export default ConversationRouter;
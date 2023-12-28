import express, { Router } from 'express';
import ConversationController from '../controllers/ConversationController';

class ConversationRouter {
    private readonly router: Router;
    private conversationController: ConversationController;

    constructor() {
        this.router = express.Router();
        this.conversationController = new ConversationController();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.post('/chat', this.conversationController.llmCommunication);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default ConversationRouter;

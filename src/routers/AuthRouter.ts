import express, {Router} from "express";

const AuthRouter: Router = express.Router();
import AuthController from "../controllers/AuthController";

AuthRouter.get('/register', AuthController.authUser)
AuthRouter.post('/login', AuthController.loginUser)

export default AuthRouter;
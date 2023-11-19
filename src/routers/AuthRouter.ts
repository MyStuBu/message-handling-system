import express, {Router} from "express";

const AuthRouter: Router = express.Router();
import AuthController from "../controllers/AuthController";

AuthRouter.post('/register', AuthController.registerUser)
AuthRouter.post('/login', AuthController.loginUser)

export default AuthRouter;
import { Router } from 'express'
import { login, signUp } from '../controllers/user.controllers.js';

export const userRoute = Router();

userRoute.route('/signup').post(signUp);
userRoute.route('/login').post(login);

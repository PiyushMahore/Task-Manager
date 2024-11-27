import { Router } from 'express'
import { signUp } from '../controllers/user.controllers.js';

export const userRoute = Router();

userRoute.route('/signup').post(signUp);

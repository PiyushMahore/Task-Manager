import { Router } from 'express'
import { changeUserDetails, login, signUp } from '../controllers/user.controllers.js';
import { varifyJwt } from '../middlewares/verifyJwt.middleware.js';

export const userRoute = Router();

userRoute.route('/signup').post(signUp);

userRoute.route('/login').post(login);

userRoute.route('/update-user').patch(varifyJwt, changeUserDetails);

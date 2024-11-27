import { Router } from 'express'
import { changeUserDetails, getCurrentUser, login, logOut, signUp } from '../controllers/user.controller.js';
import { varifyJwt } from '../middlewares/verifyJwt.middleware.js';

export const userRoute = Router();

userRoute.route('/signup').post(signUp);

userRoute.route('/login').post(login);

userRoute.route('/update-user').patch(varifyJwt, changeUserDetails);

userRoute.route('/get-current-user').get(varifyJwt, getCurrentUser);

userRoute.route('/logout').post(varifyJwt, logOut);

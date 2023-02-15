import { UserController } from './../controller/UserController';
import  express  from 'express';

export const userRouter = express.Router()
const userController = new UserController()

userRouter.post('/sign',userController.signup)
userRouter.post('/login',userController.login)
userRouter.get('/allUsers',userController.allUser)
userRouter.get('/user/:id',userController.getUserById)
userRouter.get('/profile', userController.getProfile)

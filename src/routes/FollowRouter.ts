import { FollowController } from './../controller/FollowController';
import  express  from 'express';

export const followRouter = express.Router()
const followController = new FollowController()

followRouter.post('/follow',followController.followUser)
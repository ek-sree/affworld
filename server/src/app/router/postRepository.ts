import { authCheck } from '../../middleware/authCheck.js';
import { uploadMiddleware } from '../../middleware/imageUpload.js';
import PostController from '../controller/postController.js';
import {Router} from 'express'

const postRouter = Router();

const postController = new PostController()

postRouter.post('/addPost/:userId',authCheck, uploadMiddleware, postController.createPost);
postRouter.get('/getPosts',authCheck, postController.getPost)




export default postRouter
//blog management API
import express from 'express';
import { welcomeBlog } from '../controller/blog.controller.js';


const router = express.Router()
//router level middleware which helps us in writing routes in files except the index file

router.get("/blog", welcomeBlog)


export default router
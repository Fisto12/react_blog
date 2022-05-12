import express from 'express';
import { getAllBlogs, addBlogs, updateBlog, getId, deleteBlog, getUserId } from '../controllers/blogController.js';
const router=express.Router();

router.get('/', getAllBlogs)
router.post('/addBlogs', addBlogs)
router.put('/updateBlog/:id', updateBlog)
router.get('/:id', getId)
router.delete('/delete/:id', deleteBlog)
router.get('/user/:id', getUserId)

export default router
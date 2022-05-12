import express from 'express';
import { getUsers, signUp, logIn } from '../controllers/userController.js';
const router=express.Router();

router.get('/',getUsers)
router.post('/signUp',signUp)
router.post('/logIn',logIn)

export default router
import { handleRegister,handleLogin,handleLogout } from '../controllers/authController';
import express from 'express';
import { isAuth } from '../middleware/index';
export default (router:express.Router)=>{
    router.post('/register',handleRegister)
    router.post('/login',handleLogin)
    router.post('/logout',handleLogout)
    
}
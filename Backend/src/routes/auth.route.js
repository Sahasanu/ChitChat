import express from "express";
const router = express.Router();
import {signup,login, logout,updateProfile, checkAuth} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

// Define your auth routes here
router.post('/signup', signup);

router.post('/login', login)

router.post('/logout', logout)
router.put('/updateprofile', protectRoute, updateProfile)
 router.get('/check', protectRoute, checkAuth)
export default router; 

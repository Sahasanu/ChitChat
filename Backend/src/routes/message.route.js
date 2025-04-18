import express from "express";
const router = express.Router();

import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserforsidebar } from "../controllers/messages.controller.js";
import { getMessages, sendMessage } from "../controllers/messages.controller.js"

router.get("/user", protectRoute, getUserforsidebar)
router.get("/:id", protectRoute, getMessages)
router.get("/send/:id", protectRoute, sendMessage)

export default router; 

import { Router } from "express";
import { authCallBack } from "../controllers/auth.controller.js";

const router = Router();

router.post('/callback', authCallBack);
    
export default router;
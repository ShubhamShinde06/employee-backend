import { Router } from "express";
import { getMyProfile, login, logout} from "../controllers/user.controller.js";
import { isUser } from "../middleware/verifyTokenuser.js";

const router = Router()

//router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', isUser ,getMyProfile)

export default router
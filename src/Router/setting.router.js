import {Router} from "express"
import { isUser } from "../middleware/verifyTokenuser.js"
import { changePassword } from "../controllers/Setting.controller.js"

const router = Router()

router.put('/change-password', isUser, changePassword)

export default router
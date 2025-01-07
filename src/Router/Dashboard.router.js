import Router from "express"
import { isAdmin } from "../middleware/verifyTokenadmin.js"
import { getDashData } from "../controllers/Dashboard.controller.js"

const router = Router()

router.get('/data', isAdmin, getDashData)

export default router
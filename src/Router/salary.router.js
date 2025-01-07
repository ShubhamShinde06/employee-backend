import {Router} from "express"
import { addSalary, getSalary, getUserSalary } from "../controllers/Salary.controller.js"
import { isAdmin } from "../middleware/verifyTokenadmin.js"
 
const router = Router()

router.post('/add-salary',isAdmin, addSalary)
router.get('/get-salary/:id', getSalary)

router.get('/get-usersalary/:id', getUserSalary)

export default router
import { Router } from "express";
import { addEmployee, deleteEmployee, fetchEmployeeByDepId, getEmployee, getSingleEmployee, updateEmployee, } from "../controllers/Employee.controller.js";
import {isUser} from "../middleware/verifyTokenuser.js"
import {isAdmin} from "../middleware/verifyTokenadmin.js"
//import { upload } from "../middleware/multer.middleware.js";

const router = Router()

router.post('/add-employee', isAdmin, addEmployee)
router.get('/get-employee', isAdmin, getEmployee)
router.get('/get-single-employee/:id', isUser, getSingleEmployee )
router.put('/update-employee/:id', isUser, updateEmployee)
router.delete('/delete-employee/:id', isUser, deleteEmployee)
router.get('/department/:id', isAdmin, fetchEmployeeByDepId)

export default router;
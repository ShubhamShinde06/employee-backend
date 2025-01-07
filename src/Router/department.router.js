import { Router } from "express";
import { isAdmin } from "../middleware/verifyTokenadmin.js";
import { addDepartment, deletDepartment, getDepartment, getSingleDepartment, updatDepartment } from "../controllers/department.controller.js";


const router = Router()

router.post('/add-department', isAdmin, addDepartment)
router.get('/get-department', isAdmin, getDepartment)
router.get('/get-single-department/:id', isAdmin, getSingleDepartment)
router.delete('/delete-department/:id', isAdmin, deletDepartment)
router.put('/update-department/:id', isAdmin, updatDepartment)

export default router
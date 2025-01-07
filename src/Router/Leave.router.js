import { Router } from "express";
import { isAdmin } from "../middleware/verifyTokenadmin.js";
import { addLeave, deletLeave, getLeave, getLeaves, getLeavesUser, getSingleLeave, updateLeave } from "../controllers/Leave.controller.js";

const router = Router()

router.post("/add-leave",  addLeave)
router.get("/get-leave", isAdmin, getLeave)
router.get("/get-single-leave/:id",  getSingleLeave)
router.get("/get-single-leaves/:id",  getLeaves)
router.get("/get-user-leaves/:id",  getLeavesUser)
router.put("/update-leave/:id", isAdmin, updateLeave)
router.delete("/delete-leave/:id", isAdmin, deletLeave)

export default router
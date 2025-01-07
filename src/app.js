import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin:process.env.FRONTEND_URL
}))
app.use(cookieparser())


import userRoute from "./Router/auth.router.js"
app.use("/api/auth", userRoute)

import departmentRoute from "./Router/department.router.js"
app.use("/api/department", departmentRoute)

import employeeRoute from "./Router/Employee.router.js"
app.use("/api/employee", employeeRoute)

import salaryRoute from "./Router/salary.router.js"
app.use("/api/salary", salaryRoute)

import leaveRoute from "./Router/Leave.router.js"
app.use("/api/leave", leaveRoute)

import settingRoute from "./Router/setting.router.js"
app.use("/api/setting", settingRoute)

import deshboardRouter from "./Router/Dashboard.router.js"
app.use("/api/dashboard", deshboardRouter)

export default app
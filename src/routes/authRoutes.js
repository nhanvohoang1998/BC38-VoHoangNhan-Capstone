import express from 'express'
import { login, signUp } from '../controllers/authControllers.js'

const authRoutes = express.Router()

//đăng nhập, đăng ký
authRoutes.post('/signUp', signUp)
authRoutes.post('/login', login)



export default authRoutes
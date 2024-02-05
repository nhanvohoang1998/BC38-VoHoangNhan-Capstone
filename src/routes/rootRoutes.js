import express from 'express'
import authRoutes from './authRoutes.js'
import imgRoutes from './imgRoutes.js'
import userRoutes from './userRoutes.js'

const rootRoutes = express.Router()

rootRoutes.use('/auth', authRoutes)
rootRoutes.use('/img', imgRoutes)
rootRoutes.use('/user', userRoutes)

export default rootRoutes
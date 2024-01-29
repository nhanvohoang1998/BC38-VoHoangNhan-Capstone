import express from 'express'
import { getAllImg, searchImg } from '../controllers/imgControllers.js'

const imgRoutes = express.Router()
imgRoutes.get('/getAllImg', getAllImg)
imgRoutes.get('/searchImg', searchImg)

export default imgRoutes
import express from 'express'
import { detailImg, getAllImg, getComment, isSaveImg, saveComments, searchImg } from '../controllers/imgControllers.js'
import { verifyToken } from '../config/jwt.js'

const imgRoutes = express.Router()
//Trang chủ
imgRoutes.get('/getAllImg', getAllImg)
imgRoutes.get('/searchImg', searchImg)

//Trang chi tiết
imgRoutes.get('/detailImg/:hinh_id', detailImg)
imgRoutes.get('/detailImg/getComment/:hinh_id', getComment)
imgRoutes.get('/detailImg/saveImg/:hinh_id', verifyToken, isSaveImg)
imgRoutes.post('/detailImg/saveComments', verifyToken, saveComments)


export default imgRoutes
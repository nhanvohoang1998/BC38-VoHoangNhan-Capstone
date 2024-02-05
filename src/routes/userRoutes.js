import express from 'express'
import { addImg, deleteImg, editUserInfo, getImgCreatedFromUserId, getImgSavedByUserId, getInfoUser } from '../controllers/userControllers.js'
import { verifyToken } from '../config/jwt.js'

const userRoutes = express.Router()

// Trang quản lý ảnh 
userRoutes.get('/getInfoUser', getInfoUser)
userRoutes.get('/getImgSavedByUserId/:nguoi_dung_id', verifyToken, getImgSavedByUserId)
userRoutes.get('/getImgCreatedFromUserId/:nguoi_dung_id', verifyToken, getImgCreatedFromUserId)
userRoutes.delete('/deleteImg/:hinh_id', verifyToken, deleteImg)

//Trang thêm ảnh
userRoutes.post('/addImg', verifyToken, addImg)

//Chỉnh sửa thông tin cá nhân user
userRoutes.put('/editUserInfo/:nguoi_dung_id', verifyToken, editUserInfo)


export default userRoutes
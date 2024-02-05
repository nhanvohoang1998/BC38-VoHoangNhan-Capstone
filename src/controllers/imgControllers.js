import { Op } from "sequelize"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"






const conn = initModels(sequelize)

const getAllImg = async (req, res) => {
    try {
        let data = await conn.hinh_anh.findAll({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const searchImg = async (req, res) => {
    try {
        let { inputValue } = req.query
        let data = await conn.hinh_anh.findAll({
            where: {
                ten_hinh: {
                    [Op.like]: `%${inputValue}%`
                }
            }
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const detailImg = async (req, res) => {
    try {
        let { hinh_id } = req.params
        let data = await conn.hinh_anh.findAll({
            include:
                [{
                    model: conn.nguoi_dung,
                    as: 'nguoi_dung',
                    required: true,
                    attributes: ['ho_ten', 'anh_dai_dien', 'email']

                }],
            where: {
                hinh_id
            }
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getComment = async (req, res) => {
    try {
        let { hinh_id } = req.params
        let data = await conn.binh_luan.findAll({
            attributes: ['noi_dung', 'ngay_binh_luan'],
            include:
                [
                    {
                        model: conn.hinh_anh,
                        as: 'hinh',
                        required: true,
                        where: {
                            hinh_id
                        }
                    },
                    {
                        model: conn.nguoi_dung,
                        as: 'nguoi_dung',
                        required: true,
                        attributes: ['ho_ten', 'anh_dai_dien', 'email']

                    }
                ],
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const isSaveImg = async (req, res)=>{
    try {
        let {hinh_id} =req.params
        let data = await conn.luu_anh.findOne({
            where: {
                hinh_id
            }
        })
        
        if(data){
            res.status(200).send(`Image is saved at: ${data[0].ngay_luu}`)
        }else{
            console.log(data)
            res.status(201).send(`Click to save data`)
        }

    } catch (error) {
        res.status(400).send(error)
    }
}

const saveComments = async (req, res)=>{
    try {
        let {email, ten_hinh, nguoi_dung, ngay_binh_luan, noi_dung} = req.body
        let dataNguoiDung = await conn.nguoi_dung.findOne({
            where: {
                email
            }
        })
        let dataHinhAnh = await conn.hinh_anh.findOne({
            where: {
                ten_hinh
            }
        })

        if(dataNguoiDung && dataHinhAnh){
            let {hinh_id} = dataHinhAnh
            let {nguoi_dung_id} = dataNguoiDung
            let newComment = {
                nguoi_dung_id,
                hinh_id,
                ngay_binh_luan,
                nguoi_dung,
                noi_dung
            }
            await conn.binh_luan.create(newComment)
            res.status(201).send(`Comment is saved`)
        }else{
            res.status(401).send(`check email and name image`)
        }
    } catch (error) {
        res.status(400).send(error) 
    }
}



export {
    getAllImg,
    searchImg,
    detailImg,
    getComment,
    isSaveImg,
    saveComments,
}
import { Op } from "sequelize"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

const conn = initModels(sequelize)

const getAllImg = async (req,res)=>{
    try {
        let data = await conn.hinh_anh.findAll({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const searchImg = async (req,res)=>{
    let {inputValue} = req.query
    let data = await conn.hinh_anh.findAll({
        where: {
            ten_hinh: {
                [Op.like]: `%${inputValue}%`
            }
        }
    })
    res.status(200).send(data)
}

export {
    getAllImg,
    searchImg,
}
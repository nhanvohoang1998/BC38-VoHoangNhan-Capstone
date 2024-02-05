import { nguoi_dung_id_After_verify } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const conn = initModels(sequelize)

const getInfoUser = async (req, res) => {
    try {
        let data = await conn.nguoi_dung.findAll({
            attributes: ['email', 'ho_ten', 'tuoi', 'anh_dai_dien'],
        })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getImgSavedByUserId = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params
        let data = await conn.luu_anh.findAll({
            attributes: ['nguoi_dung_id', 'ngay_luu'],
            where: {
                nguoi_dung_id
            },
            include:
                [
                    {
                        model: conn.hinh_anh,
                        as: 'hinh',
                        required: true,
                        attributes: ['ten_hinh']
                    }
                ]
        })
        if (data.length != 0) {
            if (data[0].nguoi_dung_id == nguoi_dung_id_After_verify) {
                res.status(200).send(data)
            } else {
                res.status(400).send(`nguoi_dung_id and token do not match`)
            }
        } else {
            res.status(401).send('no data found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const getImgCreatedFromUserId = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params
        let data = await conn.hinh_anh.findAll({
            where: {
                nguoi_dung_id
            }
        })
        if (data.length != 0) {
            if (data[0].nguoi_dung_id == nguoi_dung_id_After_verify) {
                res.status(200).send(data)
            } else {
                res.status(400).send(`nguoi_dung_id and token do not match`)
            }
        } else {
            res.status(401).send('no data found')
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const addImg = async (req, res) => {
    try {
        let { email, ten_hinh, duong_dan, mo_ta } = req.body
        let dataUser = await conn.nguoi_dung.findOne({
            where: {
                email
            }
        })

        if (dataUser && dataUser.nguoi_dung_id == nguoi_dung_id_After_verify) {
            let newImg = {
                ten_hinh,
                duong_dan,
                mo_ta,
                nguoi_dung_id: dataUser.nguoi_dung_id
            }
            await conn.hinh_anh.create(newImg)
            res.status(200).send(`image is created`)
        } else {
            res.status(401).send(`email not existed or token not matching`)
        }
    } catch (error) {
        res.status(400).send(error)
    }

}

const deleteImg = async (req, res) => {
    try {
        let { hinh_id } = req.params
        let data = await conn.hinh_anh.findOne({
            where: {
                hinh_id
            }
        })

        if (data && data.nguoi_dung_id == nguoi_dung_id_After_verify) {
            await conn.hinh_anh.destroy({
                where: {
                    hinh_id
                }
            })
            res.status(200).send(`Imge is deleted`)
        } else {
            res.status(401).send(`Img not found or token not matching`)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const editUserInfo = async (req, res) => {
    try {
        let { nguoi_dung_id } = req.params
        let { ho_ten, tuoi, anh_dai_dien } = req.body
        let data = await conn.nguoi_dung.findOne({
            where: {
                nguoi_dung_id
            }
        })

        if (data && data.nguoi_dung_id == nguoi_dung_id_After_verify) {
            await conn.nguoi_dung.update(
                {
                    ho_ten,
                    tuoi,
                    anh_dai_dien
                },
                {
                    where: {
                        nguoi_dung_id
                    }
                }
            )
            res.status(200).send(`User info is updated`)
        } else {
            res.status(401).send(`User not found or token not matching`)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

export {
    getInfoUser,
    getImgSavedByUserId,
    getImgCreatedFromUserId,
    addImg,
    deleteImg,
    editUserInfo,
}
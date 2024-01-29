import { createToken } from "../config/jwt.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"
import bcrypt from 'bcrypt'

const conn = initModels(sequelize)

const signUp = async (req, res) => {
    try {
        let { email, password, hoTen, tuoi } = req.body
        let data = await conn.nguoi_dung.findOne({
            where: {
                email
            }
        })
        if (data) {
            res.status(400).send("Users is existed")
        } else {
            let encodePassword = bcrypt.hashSync(password, 10)
            let newUser = {
                email,
                mat_khau: encodePassword,
                ho_ten: hoTen,
                tuoi
            }

            await conn.nguoi_dung.create(newUser)
            res.status(201).send("user is created")
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

const login = async (req,res)=>{
    try {
        let {email, password} = req.body
        let data = await conn.nguoi_dung.findOne({
            where: {
                email
            }
        })
        if(data){
            let checkPassword = bcrypt.compareSync(password, data.mat_khau)
            if(checkPassword){
                let payload = {
                    nguoi_dung_id: data.nguoi_dung_id
                }
                let token = createToken(payload)
                res.status(200).send(token)
            }else{
                res.status(400).send("password incorrect")
            }
        }else{
            res.status(400).send("user is not existed in db")
        }

    } catch (error) {
        res.status(404).send(error)
    }
}

export {
    signUp,
    login,
}
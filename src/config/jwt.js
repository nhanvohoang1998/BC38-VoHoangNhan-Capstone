import jwt from "jsonwebtoken";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

let nguoi_dung_id_After_verify
const conn = initModels(sequelize)

const createToken = (data) => {
    return jwt.sign({ data }, "NODE38", { expiresIn: "1y" })
}

const checkToken = (token) => {
    return jwt.verify(token, "NODE38", (err, decodedToken) => {
        if (err) {
            return {
                statusCode: 401,
                message: 'invalid token'
            }
        }
        return {
            statusCode: 200,
            data: decodedToken.data
        }

    })
}

const verifyToken = async (req, res, next) => {
    let { token } = req.headers
    if (!token) {
        res.status(401).send(`No token in headers`)
        return
    }

    let isValidToken = checkToken(token)
    if (isValidToken.statusCode == 401) {
        res.status(401).send(isValidToken.message)
        return
    }

    let { nguoi_dung_id } = isValidToken.data
    let data = await conn.nguoi_dung.findOne({
        where: {
            nguoi_dung_id
        }
    })

    if (!data) {
        res.status(401).send(`invalid`)
        return
    }else{
        nguoi_dung_id_After_verify = nguoi_dung_id
    }
    next()
}

export {
    createToken,
    verifyToken,
    nguoi_dung_id_After_verify,
}
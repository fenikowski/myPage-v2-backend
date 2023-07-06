import mysql from "../adapters/mysql.js";
import { errorHandler } from "../utils/errors.js";
import { postUserModel } from "../models/userModel.js";
import bcrypt from "bcrypt"

const postUserController = (req, res, next, config) => {
    const conn      = mysql.start(config);
    const { password } = req.body;

    bcrypt
        .hash(password, config.saltRounds)
        .then(hash => postUserModel({ ...req.body, password: hash, conn }))
        .then(data => {
            const result = {
                _data: { users: data }
            };

            next(result);
        })
        .catch(err => {
            console.log(err)
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        });
};

export { postUserController };
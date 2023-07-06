import bcrypt from "bcrypt"
import { errorHandler } from "../utils/errors.js";
import { sendResponseUnauthorized } from "../utils/responses.js";
import { getLoginModel } from "../models/loginModel.js";
import mysql from "../adapters/mysql.js";

const postLoginController = (req, res, next, config) => {
    const conn = mysql.start(config);
    const { username, password } = req.body;

    getLoginModel({username, conn})
        .then(response => {
            if (!response.length) {
                const error = errorHandler({ code: 'UNAUTHORIZED' }, config.environment);
                return sendResponseUnauthorized(res, error)
            }

            const userData = response[0];
            return bcrypt
                .compare(password, userData.password)
                .then(verified => {
                    if (!verified) {
                        const error = errorHandler({ code: 'UNAUTHORIZED' }, config.environment);
                        return sendResponseUnauthorized(res, error)
                    }

                    const { username } = userData;

                    next({ _data: { username } })
                })
        })
        .catch(err => {
          const error = errorHandler(err, config.environment);
          res.status(error.code).json(error);
        })
        .finally(() => {
          mysql.end(conn);
        });
};

export {postLoginController};
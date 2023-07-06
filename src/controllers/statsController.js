import mysql from "../adapters/mysql.js";
import { errorHandler } from "../utils/errors.js";
import { getStatsModel } from "../models/statsModel.js";

const getStatsController = (req, res, next, config) => {
    const conn = mysql.start(config);

    getStatsModel({...req.query, conn})
        .then((getResults) =>
            next({ _data: { stats: getResults } })
        )
        .catch((err) => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
};

export { getStatsController };
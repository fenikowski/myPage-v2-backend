import mysql from "../adapters/mysql.js";
import { error404, errorHandler } from "../utils/errors.js";
import { countVisitModel, getVisitModel, postVisitModel } from "../models/visitModel.js";

const getVisitController = (req, res, next, config) => {
    const conn = mysql.start(config);

    Promise.all([
        getVisitModel({...req.query, conn}),
        countVisitModel({...req.query, conn})
    ])
        .then(([getResults, countResults]) =>
            next({
                _data: { visits: getResults },
                _page: {
                    totalElements: countResults,
                    limit        : req.query.limit || 100,
                    page         : req.query.page || (countResults && 1) || 0
                }
            })
        )
        .catch((err) => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        })
};

const getVisitIdController = (req, res, next, config) => {
    const conn = mysql.start(config);
    const id = req.params.id;

    getVisitModel({id, conn})
        .then(data => {

            if (!data.length) {
                const err = error404();
                return res.status(err.status).json(errorHandler(err, config.environment));
            }

            const result = {
                _data: { visits: data }
            };
            next(result)
        })
        .catch(err => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        });
}

const postVisitController = (req, res, next, config) => {
    const conn      = mysql.start(config);

    postVisitModel({...req.body, conn})
        .then(data => {
            const result = {
                _data: { visits: data }
            };

            next(result);
        })
        .catch(err => {
            const error = errorHandler(err, config.environment);
            res.status(error.code).json(error);
        })
        .finally(() => {
            mysql.end(conn);
        });
};

export {
    getVisitController,
    getVisitIdController,
    postVisitController
};
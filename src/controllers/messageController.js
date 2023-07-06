import mysql from "../adapters/mysql.js";
import { error404, errorHandler } from "../utils/errors.js";
import { countMessageModel, deleteMessageModel, getMessageModel, postMessageModel } from "../models/messageModel.js";

const getMessageController = (req, res, next, config) => {
    const conn = mysql.start(config);

    Promise.all([
        getMessageModel({...req.query, conn}),
        countMessageModel({...req.query, conn})
    ])
        .then(([getResults, countResults]) =>
            next({
                _data: { messages: getResults },
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

const getMessageIdController = (req, res, next, config) => {
    const conn = mysql.start(config);
    const id = req.params.id;

    getMessageModel({id, conn})
        .then(data => {

            if (!data.length) {
                const err = error404();
                return res.status(err.status).json(errorHandler(err, config.environment));
            }

            const result = {
                _data: { messages: data }
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

const postMessageController = (req, res, next, config) => {
    const conn      = mysql.start(config);

    postMessageModel({...req.body, conn})
        .then(data => {
            const result = {
                _data: { messages: data }
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

const deleteMessageController = (req, res, next, config) => {
    const conn      = mysql.start(config);
    const id      = req.params.id;

    deleteMessageModel({id, conn})
        .then(() => {
            const result = {};
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
    getMessageController,
    getMessageIdController,
    postMessageController,
    deleteMessageController
};
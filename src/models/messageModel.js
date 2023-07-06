import mysql from "../adapters/mysql.js";
import {
    countMessageQuery,
    deleteMessageQuery,
    getMessageQuery,
    postMessageQuery
} from "../repositories/messageRepository.js";

const getMessageModel = ({conn, ...rest}) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(getMessageQuery(paramsToSearch), conn, paramsToSearch)
};

const countMessageModel = ({conn, ...rest}) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(countMessageQuery(paramsToSearch), conn, paramsToSearch)
        .then(results => results[0].count);
};

const postMessageModel = ({conn, ...params}) => {

    return mysql.execute(postMessageQuery({ ...params }), conn, { ...params })
};

const deleteMessageModel = ({uuid, conn}) => {
    const params = { uuid };

    return mysql
        .execute(deleteMessageQuery(params), conn, params)
};

export {
    getMessageModel,
    postMessageModel,
    deleteMessageModel,
    countMessageModel
}
import mysql from "../adapters/mysql.js";
import {
    countVisitQuery,
    getVisitQuery,
    postVisitQuery
} from "../repositories/visitRepository.js";

const getVisitModel = ({conn, ...rest}) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(getVisitQuery(paramsToSearch), conn, paramsToSearch)
};

const countVisitModel = ({conn, ...rest}) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(countVisitQuery(paramsToSearch), conn, paramsToSearch)
        .then(results => results[0].count);
};

const postVisitModel = ({conn, ...params}) => {

    return mysql.execute(postVisitQuery({ ...params }), conn, { ...params })
};

export {
    getVisitModel,
    postVisitModel,
    countVisitModel
}
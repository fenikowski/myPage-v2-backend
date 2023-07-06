import mysql from "../adapters/mysql.js";
import { getLoginQuery } from "../repositories/loginRepository.js";

const getLoginModel = ({conn, ...rest}) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(getLoginQuery(paramsToSearch), conn, paramsToSearch);
};

export { getLoginModel };
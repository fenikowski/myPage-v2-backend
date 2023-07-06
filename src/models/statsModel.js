import mysql from "../adapters/mysql.js";
import { getStatsQuery } from "../repositories/statsRepository.js";

const getStatsModel = ({conn, ...rest}) => {
    const paramsToSearch = { ...rest };

    return mysql
        .execute(getStatsQuery(paramsToSearch), conn, paramsToSearch)
};

export { getStatsModel };
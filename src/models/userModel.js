import mysql from "../adapters/mysql.js";
import { postUserQuery } from "../repositories/userRepository.js";

const postUserModel = ({conn, ...params}) => {

    return mysql.execute(postUserQuery({ ...params }), conn, { ...params })
};

export { postUserModel }
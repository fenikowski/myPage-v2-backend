import {pagination} from "../utils/pagination.js";

const _getVisitQuery = (_pagination = '') => ({ count }) => ({ id }) => {
    const idCondition = id ? `AND visits.id = :id` : "";
    
    return `
        SELECT 
            ${count || '*'}
        FROM 
            visits
        WHERE
            true
            ${idCondition}
            ${_pagination}
        ;
    `
};

const postVisitQuery = () => {
    return `
        INSERT INTO visits (device_id, datestamp)
        VALUES (
            :device_id, 
            :datestamp
        );
    `
};

const getVisitQuery = ({limit, page, ...rest}) => _getVisitQuery(pagination({ limit, page }))({count: false})(rest);
const countVisitQuery = (rest) => _getVisitQuery()({count: 'COUNT(*) AS count'})(rest);

export {
    getVisitQuery,
    postVisitQuery,
    countVisitQuery
};
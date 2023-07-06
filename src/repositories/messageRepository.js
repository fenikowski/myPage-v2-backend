import {pagination} from "../utils/pagination.js";

const _getMessageQuery = (_pagination = '') => ({ count }) => ({ id }) => {
    const idCondition = id ? `AND messages.id = :id` : "";
    
    return `
        SELECT 
            ${count || '*'}
        FROM 
            messages
        WHERE
            true
            ${idCondition}
            ${_pagination}
        ;
    `
};

const postMessageQuery = () => {
    return `
        INSERT INTO messages (author, email, message)
        VALUES (
            :author, 
            :email, 
            :message
        );
    `
};

const deleteMessageQuery = () => {
    return `
        DELETE FROM messages
        WHERE message.id= :id
    `
};

const getMessageQuery = ({limit, page, ...rest}) => _getMessageQuery(pagination({ limit, page }))({count: false})(rest);
const countMessageQuery = (rest) => _getMessageQuery()({count: 'COUNT(*) AS count'})(rest);

export {
    getMessageQuery,
    postMessageQuery,
    deleteMessageQuery,
    countMessageQuery
};
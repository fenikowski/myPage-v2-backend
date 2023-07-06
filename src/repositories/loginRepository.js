const getLoginQuery = () => {
    return `
        SELECT *
        FROM users
        WHERE username = :username;
    `
};

export { getLoginQuery };
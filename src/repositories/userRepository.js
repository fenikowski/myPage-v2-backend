const postUserQuery = () => {
    return `
        INSERT INTO users (username, password)
        VALUES (
            :username, 
            :password
        );
    `
};

export { postUserQuery };
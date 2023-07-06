const getStatsQuery = () => {
    
    return `
        SELECT
        COUNT(*) AS total_visits,
        COUNT(DISTINCT device_id) AS unique_devices_number
        FROM visit
        ;
    `
};

export { getStatsQuery };
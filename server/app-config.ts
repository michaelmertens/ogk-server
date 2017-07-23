export default Object.freeze({
    isDev: process.env.OGK_DEV,
    DB_CONNECTIONSTRING: process.env.OGK_DBCONNECTIONSTRING,
    SESSION_SECRET: process.env.OGK_SECRET
});


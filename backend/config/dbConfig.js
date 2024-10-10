const dbConfig = {
    user: 'SA',             // Database user name
    password: '@Comp9900',  // database password
    server: 'localhost',    // SQL Server address（对于 Docker 是 localhost）
    database: 'comp9900',   // database name
    options: {
        encrypt: false,     // local
        enableArithAbort: true
    }
};

module.exports = dbConfig;
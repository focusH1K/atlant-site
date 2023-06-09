module.exports = {
    HOST: 'localhost',
    PORT: '8080',
    USER: 'postgres',
    PASSWORD: 'password',
    DB: 'kurs',
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    secret: 'jwt-secret-key',
    secret_refresh: 'jwt-refresh-secret-key',
    smtp_host: "smtp.office365.com",
    smtp_port: '587',
    smtp_user: 'email',
    smtp_password: 'password',
    api_url: 'http://localhost:7000',
    client_url: 'http://localhost:3000'
}
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '381529537202011990ale9331';
const DB_NAME = process.env.DB_NAME || 'pruebas';
const DB_PORT = process.env.DB_PORT || '3306';

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
};
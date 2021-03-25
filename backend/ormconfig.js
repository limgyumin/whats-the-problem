module.exports = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/model/*.model.{ts,js}'],
  charset: 'utf8mb4_unicode_ci',
  synchronize: true,
};

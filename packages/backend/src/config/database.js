require('dotenv/config');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.NODE_ENV === 'test' ? 'test' : process.env.DB_NAME,
  storage: './__tests__/database.sqlite',
  logging: process.env.NODE_ENV === 'test' ? false : console.log, // or false
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

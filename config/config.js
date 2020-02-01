module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB_DEV,
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASS,
    "database": process.env.DB_TEST,
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
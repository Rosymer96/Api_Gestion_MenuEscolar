const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  port: process.env.PORT_DB,
  database: process.env.NAME_DB,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("Conexión a la BD exitosa");
    conn.release();
  })
  .catch((err) => {
    console.error("Error al conectar a la BD:", err.message);
  });

module.exports = pool;

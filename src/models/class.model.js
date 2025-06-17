const pool = require("../config/conexion");

const selectAll = async () => {
  const allCalsses = "SELECT * FROM class ";
  const [result] = await pool.query(allCalsses);
  return result;
};

// //Crear las peticiones SQL para crear la class
const findClass = async (id) => {
  const select = "SELECT * FROM class WHERE idClass = ?";
  const [result] = await pool.query(select, [id]);
  console.log(result);
  if (result.length === 0) {
    return false;
  }
  return result[0];
};
const createClass = async (nombre) => {
  const insert = "INSERT INTO class ( name) VALUES( ?)";
  const [result] = await pool.query(insert, [nombre]);
  return result;
};

//editar nombre de clase
const modificarClass = async (id, datos) => {
  const { nombre } = datos;
  console.log(id , nombre)
  try {
    const update = "UPDATE class SET nombre = ? WHERE idClass = ? ";
    const [result] = await pool.query(update, [nombre, id ]);
    console.log(result);
    if (result.affectedRows === 0) {
      return false;
    }
    return result;
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  selectAll,
  createClass,
  findClass,
  modificarClass,
};

const pool = require("../config/conexion");

const selectAll = async () => {
  const allCalsses = "SELECT * FROM Class ";
  const [result] = await pool.query(allCalsses);
  return result;
};

// //Crear las peticiones SQL para crear la class
const findClassById = async (id) => {
  const select = "SELECT * FROM Class WHERE idClass = ?";
  const [result] = await pool.query(select, [id]);
  console.log(result);
  if (result.length === 0) {
    return false;
  }
  return result[0];
};
const findClassByName = async (name) => {
  const select = "SELECT * FROM Class WHERE name = ?";
  const [result] = await pool.query(select, [name]);
  console.log(result);
  if (result.length === 0) {
    return false;
  }
  return result[0];
};

const createClass = async (name) => {
  const insert = "INSERT INTO Class (name) VALUES (?) ";
  const [result] = await pool.query(insert, [name]);
  return result;
};

//editar nombre de clase
const updateClass = async (name, id) => {
  const update = "UPDATE Class SET name = ? WHERE idClass = ? ";
  const [result] = await pool.query(update, [name, id]);
  return result;
};

//eliminar una clase
const eliminarClass = async (id) => {
  try {
    const eliminar = "DELETE FROM Class WHERE idClass = ? ";
    const [result] = await pool.query(eliminar, id);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  selectAll,
  createClass,
  findClassById,
  findClassByName,
  updateClass,
  eliminarClass,
};

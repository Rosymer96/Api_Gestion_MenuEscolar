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
  return result[0];
};
const findClassByName = async (name) => {
  const select = "SELECT * FROM Class WHERE name = ?";
  const [result] = await pool.query(select, [name]);
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
const deleteClass = async (id) => {
  const deleteClass = "DELETE FROM Class WHERE idClass = ? ";
  const [result] = await pool.query(deleteClass, id);
  return result;
};

module.exports = {
  selectAll,
  createClass,
  findClassById,
  findClassByName,
  updateClass,
  deleteClass,
};

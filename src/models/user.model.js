//modelo de datos
const pool = require("../config/conexion");

//Sql para el CRUD del usuario

//Crear el usuario TUTOR
// Busqueda de dni en tabla student:

const findDniInStudent = async (tutorDni) => {
  const select = "SELECT * FROM Student WHERE tutor_dni = ?";
  const [result] = await pool.query(select, [tutorDni]);
  if (result.length === 0) {
    return false;
  }
  return result;
};

//Revisar si el campo id_tutor en tabla student esta lleno.

const checkTutorId = async (tutorId) => {
  const select = "SELECT * FROM Student WHERE tutor_id = ?";
  const [result] = await pool.query(select, [tutorId]);
  if (result.length === 0) {
    return false;
  }
  return result;
};
//Guardar el id de tutor en los estudiantes relacionados.
const saveTutorId = async (newTutorId, tutorDni) => {
  const update = "UPDATE Student SET tutor_id = ? WHERE tutor_dni = ?";
  const [result] = await pool.query(update, [newTutorId, tutorDni]);
  return result;
};

//Buscar en dni del admin en la tabla DniAdministrator

const findDniInAdministrator = async (dni) => {
  const select = "SELECT * FROM DniAdministrator WHERE dni = ?";
  const [result] = await pool.query(select, [dni]);
  return result[0];
};

//Buscar si ya existe un usuario

const findDniInUser = async (dni) => {
  const select = "SELECT * FROM User WHERE dni = ?";
  const [result] = await pool.query(select, [dni]);
  return result[0];
};

//Crear user
const createUser = async (name, email, password, dni, rol) => {
  const insert =
    "INSERT INTO User (name, email, password, dni, rol)  VALUES (?,?,?,?,?)";
  const [result] = await pool.query(insert, [name, email, password, dni, rol]);
  return result[0];
};

//Listar los usuarios

//Editar el usuario

//Eliminar el usuario(borrar el tutorid asociado al estudiante).

module.exports = {
  findDniInStudent,
  checkTutorId,
  createUser,
  saveTutorId,
  findDniInAdministrator,
  findDniInUser,
};

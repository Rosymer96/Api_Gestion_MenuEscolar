//modelo de datos
const pool = require("../config/conexion");

//CRUD
const findByDni = async (studentDni) => {
  const selectByDni = "SELECT * FROM Student WHERE student_dni = ?";
  const [result] = await pool.query(selectByDni, [studentDni]);
  return result[0];
};

const addStudent = async (name, studentDni, classId, tutorDni) => {
  const insert =
    "INSERT INTO Student (name, student_dni, class_id, tutor_dni) VALUES (?,?,?,?)";
  const [result] = await pool.query(insert, [
    name,
    studentDni,
    classId,
    tutorDni,
  ]);
  return result;
};

//Editar estudiante:

//Eliminar estudiante:

const desactiveStudent = async (id) => {
  const desactive = "UPDATE Student SET activo = FALSE WHERE idStudent = ?";
  const [result] = await pool.query(desactive, [id]);
  return result;
};

const reactivateStudent = async (dni) => {
  const reactive = "UPDATE Student SET activo = TRUE WHERE student_dni = ?";
  const [result] = await pool.query(reactive, [dni]);
  return result;
};

module.exports = { addStudent, findByDni, desactiveStudent, reactivateStudent };

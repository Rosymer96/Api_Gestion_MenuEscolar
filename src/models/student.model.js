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

//Select del dni del tutor

module.exports = { addStudent, findByDni };

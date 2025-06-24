//modelo de datos
const pool = require("../config/conexion");

//CRUD
const findByDni = async (studentDni) => {
  const selectByDni = "SELECT * FROM Student WHERE student_dni = ?";
  const [result] = await pool.query(selectByDni, [studentDni]);
  return result[0];
};

const findById = async (id) => {
  const selectById = "SELECT * FROM Student WHERE idStudent = ?";
  const [result] = await pool.query(selectById, [id]);
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

const editStudentDB = async (id, name, studentDni, classId, tutorDni) => {
  const edit =
    "UPDATE Student SET name = ?, student_dni = ?, class_id = ?, tutor_dni = ? WHERE idStudent = ?";
  const [result] = await pool.query(edit, [
    name,
    studentDni,
    classId,
    tutorDni,
    id,
  ]);
  return result;
};

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

const listStudentsByClass = async (classId) => {
  const query = "SELECT * FROM Student WHERE class_id = ?";
  const [result] = await pool.query(query, [classId]);
  return result;
};

const selectStudents = async () => {
  const select = "SELECT * FROM Student";
  const [result] = await pool.query(select);
  return result;
};

const listStudentsByTutorId= async (id) => {
  const select = "SELECT * FROM Student WHERE tutor_id = ? AND activo = 1";
  const [result] = await pool.query(select, [id]);
  return result;
};

module.exports = {
  addStudent,
  findByDni,
  desactiveStudent,
  reactivateStudent,
  editStudentDB,
  findById,
  listStudentsByClass,
  selectStudents,
  listStudentsByTutorId,
};

const studentModel = require("../models/student.model");
const classModel = require("../models/class.model");

//crear estudiante

const registerStudent = async (req, res) => {
  try {
    const { name, studentDni, classId, tutorDni } = req.body;
    if (!name || !studentDni || !classId || !tutorDni) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    //Compruebo si ya existe el estudiante:

    const existingStudent = await studentModel.findByDni(studentDni);
    if (existingStudent) {
      return res.status(409).json({
        error: "Ya existe un estudiante registrado con este documento.",
      });
    }
    //Agrego el estudiante
    const result = await studentModel.addStudent(
      name,
      studentDni,
      classId,
      tutorDni
    );
    console.log(result);
    res
      .status(201)
      .json({ message: "Registrado con exito", idStudent: result.insertId });
  } catch (error) {
    console.error("Error al registrar el estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al registrar el estudiante" });
  }
};

//Editar el estudiante:

const editStudent = async (req, res) => {
  try {
    const { idStudent } = req.params;
    const { name, studentDni, classId, tutorDni } = req.body;

    // Validar datos obligatorios
    if (!name || !studentDni || !classId || !tutorDni) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    //verificar si el estudiante existe
    const existingId = await studentModel.findById(idStudent);
    if (!existingId) {
      return res.status(404).json({
        error: "Estudiante no encontrado",
      });
    }

    // Verifica que el DNI no esté duplicado en otro estudiante
    const existingStudent = await studentModel.findByDni(studentDni);
    if (existingStudent && existingStudent.idStudent !== parseInt(idStudent)) {
      return res
        .status(409)
        .json({ error: "El DNI ya está registrado a otro estudiante" });
    }
    const result = await studentModel.editStudentDB(
      idStudent,
      name,
      studentDni,
      classId,
      tutorDni
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se modifico ningun dato" });
    }

    res.status(200).json({ message: "Estudiante actualizado correctamente" });
  } catch (error) {
    console.error("Error al editar estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al editar el estudiante" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { idStudent } = req.params;

    const existingId = await studentModel.findById(idStudent);
    if (!existingId) {
      return res.status(404).json({
        error: "Estudiante no encontrado",
      });
    }

    const result = await studentModel.deleteStudent(idStudent);

    res.status(200).json({ message: "Estudiante eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al eliminar el estudiante" });
  }
};

// Desactivar estudiante por ID
const desactiveStudentController = async (req, res) => {
  try {
    const { idStudent } = req.body;

    // Validar ID
    if (!idStudent) {
      return res
        .status(400)
        .json({ error: "El ID del estudiante es obligatorio" });
    }

    // Verificar si el estudiante existe
    const existingStudent = await studentModel.findById(idStudent);
    if (!existingStudent) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    const result = await studentModel.desactiveStudent(idStudent);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "No se desactivó ningún estudiante" });
    }

    res.status(200).json({ message: "Estudiante desactivado correctamente" });
  } catch (error) {
    console.error("Error al desactivar estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al desactivar el estudiante" });
  }
};

// Reactivar estudiante por DNI
const reactivateStudentController = async (req, res) => {
  try {
    const { idStudent } = req.body;

    // Validar DNI
    if (!idStudent) {
      return res
        .status(400)
        .json({ error: "El id del estudiante es obligatorio" });
    }

    // Verificar si el estudiante existe
    const existingStudent = await studentModel.findById(idStudent);
    if (!existingStudent) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    const result = await studentModel.reactivateStudent(idStudent);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se activó ningún estudiante" });
    }

    res.status(200).json({ message: "Estudiante reactivado correctamente" });
  } catch (error) {
    console.error("Error al reactivar estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al reactivar el estudiante" });
  }
};

const getStudentsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      return res.status(400).json({
        error: "El parámetro classId es obligatorio",
      });
    }
    const className = await classModel.findClassById(classId);
    const students = await studentModel.listStudentsByClass(classId);

    if (students.length === 0) {
      return res.status(404).json({
        message: "No se encontraron estudiantes para esta clase",
      });
    }

    res.status(200).json({
      success: true,
      class: className.name,
      students: students,
    });
  } catch (error) {
    console.error("Error al listar estudiantes por clase:", error);
    res.status(500).json({
      error: "Error del servidor al obtener los estudiantes por clase",
    });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.selectStudents();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error) {
    console.error("Error al listar estudiantes:", error);
    res.status(500).json({
      error: "Error del servidor al obtener los estudiantes.",
    });
  }
};

const getStudentsByTutorId = async (req, res) => {
  const tutorId = req.userLogin.id; //viene del middelware
  try {
    console.log(tutorId);
    const students = await studentModel.listStudentsByTutorId(tutorId);
    console.log(students);

    if (students.length === 0) {
      return res.status(404).json({
        message: "No se encontraron estudiantes para este tutor",
      });
    }

    res.status(200).json({
      success: true,
      students: students,
    });
  } catch (error) {
    console.log(tutorId);
    console.error("Error al listar estudiantes por tutor:", error);
    res.status(500).json({
      error: "Error del servidor al obtener los estudiantes por tutor",
    });
  }
};

const getStudendById = async (req, res) => {
  try {
    const { idStudent } = req.params;

    if (!idStudent) {
      return res.status(400).json({
        error: "El parámetro studentId es obligatorio",
      });
    }
    console.log(`Buscando estudiante con ID: ${idStudent}`);
    const student = await studentModel.findById(idStudent);
    res.status(200).json({
      message: "Estudiante encontrado",
      student: student,
    });
  } catch (error) {
    console.error("Error al listar estudiante por id:", error);
    console.log(error);
    res.status(500).json({
      error: "Error del servidor al obtener los estudiantes por id",
    });
  }
};

module.exports = {
  registerStudent,
  deleteStudent,
  editStudent,
  getStudentsByClass,
  getAllStudents,
  getStudentsByTutorId,
  reactivateStudentController,
  desactiveStudentController,
  getStudendById,
};

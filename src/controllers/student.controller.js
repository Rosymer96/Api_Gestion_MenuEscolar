const studentModel = require("../models/student.model");

//crear estudiante

const registerStudent = async (req, res) => {
  try {
    const { name, studentDni, classId, tutorDni } = req.body;
    if (!name || !studentDni || !classId || !tutorDni) {
      return res.status(400).json({
        error:
          "Todos los campos (name, studentDni, classId, tutorDni) son obligatorios",
      });
    }

    //Compruebo si ya existe el estudiante:

    const existingStudent = await studentModel.findByDni(studentDni);
    if (existingStudent) {
      if (existingStudent.activo) {
        return res
          .status(409)
          .json({ error: "Ya existe un estudiante activo con este DNI" });
      } else {
        // Reactivar al estudiante inactivo
        await studentModel.reactivateStudent(studentDni);
        return res
          .status(200)
          .json({ message: "Estudiante reactivado exitosamente" });
      }
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
    const { id } = req.params;
    const { name, studentDni, classId, tutorDni } = req.body;

    // Validar datos obligatorios
    if (!name || !studentDni || !classId || !tutorDni) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    //verificar si el estudiante existe
    const existingId = await studentModel.findById(id);
    if (!existingId) {
      return res.status(404).json({
        error: "Estudiante no encontrado",
      });
    }

    // Verifica que el DNI no esté duplicado en otro estudiante
    const existingStudent = await studentModel.findByDni(studentDni);
    if (existingStudent && existingStudent.idStudent !== parseInt(id)) {
      return res
        .status(409)
        .json({ error: "El DNI ya está registrado a otro estudiante" });
    }
    const result = await studentModel.editStudentDB(
      id,
      name,
      studentDni,
      classId,
      tutorDni
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se modifico ningun dato" });
    }

    res
      .status(200)
      .json({ message: "Estudiante actualizado correctamente", data: result });
  } catch (error) {
    console.error("Error al editar estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al editar el estudiante" });
  }
};

//Cambiar el estado activo del estudiante al eliminarlo "de la logica"

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const existingId = await studentModel.findById(id);
    if (!existingId) {
      return res.status(404).json({
        error: "Estudiante no encontrado",
      });
    }

    const result = await studentModel.desactiveStudent(id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "El estudiande ya se encuentra inactivo" });
    }
    res
      .status(200)
      .json({ message: "Estudiante marcado como inactivo", data: result });
  } catch (error) {
    console.error("Error al editar estudiante:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al eliminar el estudiante" });
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

    const students = await studentModel.listStudentsByClass(classId);

    if (students.length === 0) {
      return res.status(404).json({
        message: "No se encontraron estudiantes para esta clase",
      });
    }

    res.status(200).json({
      success: true,
      data: students,
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

module.exports = {
  registerStudent,
  deleteStudent,
  editStudent,
  getStudentsByClass,
  getAllStudents,
};

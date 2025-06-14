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
    res.status(201).json({ message: "Registrado con exito", data: result });
  } catch (error) {
    res.status(500).json(error);
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
      return res.status(404).json({ error: "Estudiante no encontrado" });
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
    const result = await studentModel.desactiveStudent(id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Estudiante no encontrado o ya inactivo" });
    }
    res
      .status(200)
      .json({ message: "Estudiante marcado como inactivo", data: result });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};



module.exports = { registerStudent, deleteStudent, editStudent };

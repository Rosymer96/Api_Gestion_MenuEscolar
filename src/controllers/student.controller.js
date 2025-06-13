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
    res.status(200).json({ message: "Estudiante marcado como inactivo" });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

//Buscar el dni  y avisar si lo encuentra:

//  si no lo encuentra, avisar queno tiene estudiantes asignados a ese tutor

//Si si lo encuentra revisa si el campo id_tutor esta lleno.

//Si esta lleno id_tutor avisa que ya hay una cuenta con ese dni o documento

//Si esta vacio el id_tutor, te crea la cuenta

//encripta la contraseña

module.exports = { registerStudent, deleteStudent };

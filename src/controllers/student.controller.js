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
      return res.status(409).json({
        error: "Ya existe un estudiante registrado con este DNI",
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
    res.status(201).json({ message: "Registrado con exito", data: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

//Buscar el dni del tutor y avisar si lo encuentra:

//  si no lo encuentra, avisar queno tiene estudiantes asignados a ese tutor

//Si si lo encuentra revisa si el campo id_tutor esta lleno.

//Si esta lleno id_tutor avisa que ya hay una cuenta con ese dni o documento

//Si esta vacio el id_tutor, te crea la cuenta

//encripta la contraseña

module.exports = { registerStudent };

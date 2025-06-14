const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//1.Crear el usuario TUTOR:

const registerTutorUser = async (req, res) => {
  try {
    const { name, email, password, dni, rol } = req.body;

    if (!name || !email || !password || !dni || !rol) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    //Buscar el dni  en la tabla estudiante
    //si no lo encuentra, avisar que no tiene estudiantes asignados a ese tutor
    const dniInStudent = await userModel.findDniInStudent(dni);
    if (!dniInStudent || dniInStudent.length === 0) {
      return res.status(400).json({
        message:
          "No existen estudiantes con este documento de tutor registrado",
      });
    }
    //Si lo encuentra revisa si  ya tiene tutor_id asignado y avisa que ya hay una cuenta con ese dni o documento.

    const alreadyLinked = dniInStudent.some((s) => s.tutor_id !== null);
    if (alreadyLinked) {
      return res.status(409).json({
        error: "Ya existe una cuenta asociada a este documento de tutor",
      });
    }
    //Si esta vacio el id_tutor, te crea la cuenta

    //encripta la contraseña
    hashedPassword = bcrypt.hashSync(password, 10);

    const newTutor = await userModel.createUser(
      name,
      email,
      hashedPassword,
      dni,
      rol
    );
    //guarda el id de usuario en el tutor_id de la  tabla estudiante.

    await userModel.saveTutorId(newTutor.insertId, dni);

    res.status(201).json({
      message: "Tutor registrado y estudiantes relacionados correctamente",
      newTutorId: newTutor.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//2.Crear el usuario admin

const registerAdminUser = async (req, res) => {
  try {
    const { name, email, password, dni, rol } = req.body;

    if (!name || !email || !password || !dni || !rol) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    //Revisa si existe su DNI en la tabla de DniAdministraror
    const existingAdmin = await userModel.findDniInAdministrator(dni);
    if (!existingAdmin) {
      return res.status(400).json({
        message:
          "No existen este administrador en la base de datos, revisa si el rol que escogiste es el correcto",
      });
    }
    //Si si lo encuentra revisa si ya existe un usuario en la tabla usuarios y avisa que ya existe una cuenta asociada.

    const existingUser = await userModel.findDniInUser(dni);
    if (existingUser) {
      return res.status(400).json({
        message: "Este administrador ya se encuentra registrado.",
      });
    }
    //Si no, crea la cuenta
    // Encripta la contraseña
    hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = await userModel.createUser(
      name,
      email,
      hashedPassword,
      dni,
      rol
    );
    res.status(201).json({
      message: "Adminisrador registrado correctamente",
      newAdminId: newAdmin.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Si no, crea la cuenta, encripta la contrase;a

//3.Editar usuario

//4.Listar usuarios por rol

//5.Eliminar usuario

module.exports = { registerTutorUser, registerAdminUser };

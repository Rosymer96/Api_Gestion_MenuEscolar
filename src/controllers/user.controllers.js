

const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utils/jwt");

//1.Crear el usuario TUTOR:

const registerTutorUser = async (req, res) => {
  try {
    const { name, email, password, dni } = req.body;
    const rol = "tutor";
    if (!name || !email || !password || !dni) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    //Buscar el dni  en la tabla estudiante
    //si no lo encuentra, avisar que no tiene estudiantes asignados a ese tutor
    const dniInStudent = await userModel.findDniInStudent(dni);
    console.log(dniInStudent);
    if (dniInStudent.length === 0) {
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
    console.log("Resultado de createUser:", newTutor);

    await userModel.saveTutorId(newTutor.insertId, dni);

    res.status(201).json({
      message: "Tutor registrado y estudiantes relacionados correctamente",
      newTutorId: newTutor.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//2.Crear el usuario admin

const registerAdminUser = async (req, res) => {
  try {
    const { name, email, password, dni } = req.body;
    const rol = "administrador";
    if (!name || !email || !password || !dni) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    //Revisa si existe su DNI en la tabla de DniAdministraror
    const existingAdmin = await userModel.findDniInAdministrator(dni);
    if (!existingAdmin) {
      return res.status(400).json({
        message: "No existen este administrador en la base de datos.",
      });
    }
    //Si si lo encuentra revisa si ya existe un usuario en la tabla usuarios y avisa que ya existe una cuenta asociada.

    const existingUser = await userModel.findDniAdminInUser(dni);
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

//3.Login de usuario

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    const selectedUser = await userModel.selectByEmail(email);
    if (!selectedUser) {
      return res
        .status(404)
        .json({ message: "Email no corresponde a ningun usuario" });
    }
    //Convertirmos el password
    const isSame = bcrypt.compareSync(password, selectedUser.password);
    if (!isSame) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    //Creamos la data para enviarla a jwt
    const data = {
      id: selectedUser.id,
      email: selectedUser.email,
      rol: selectedUser.rol,
    };
    //Creamos el token
    const token = createToken(data);
    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: selectedUser.id,
        email: selectedUser.email,
        rol: selectedUser.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//4. Ir al perfil del usuario

const getProfile = async (req, res) => {
  try {
    const dataUser = await userModel.selectById(req.userLogin.id);
    if (!dataUser) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    const filteredUser = {
      id: dataUser.id,
      name: dataUser.name,
      email: dataUser.email,
      dni: dataUser.dni,
    };
    res.status(200).json({ success: true, data: filteredUser });
    console.log("He llegado al profile");
  } catch (error) {
    console.error("Error al obtener el perfil.", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

//5.Editar usuario solo con name, email y password.

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    //Encriptamos la nueva contrasena:
    hashedPassword = bcrypt.hashSync(password, 10);

    const result = await userModel.updateUser(name, email, hashedPassword, id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res
      .status(200)
      .json({ message: "Usuario actualizado correctamente", data: result });
  } catch (error) {
    console.error("Error al obtener el perfil del administrador:", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

//6.Listar usuarios por rol

const listTutors = async (req, res) => {
  try {
    const tutors = await userModel.selectAllTutors();
    res.status(200).json({ message: tutors });
  } catch (error) {
    console.error("Error al obtener lista de tutores", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

//7.Eliminar usuario
const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userModel.deactiveUser(id);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado o ya inactivo" });
    }
    res
      .status(200)
      .json({ message: "Usuario marcado como inactivo", data: result });
  } catch (error) {
    console.error("Error al obtener el perfil del administrador:", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

module.exports = {
  registerTutorUser,
  registerAdminUser,
  login,
  getProfile,
  updateUser,
  softDeleteUser,
  listTutors,
};


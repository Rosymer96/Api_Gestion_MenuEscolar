const router = require("express").Router();
const userCon = require("../../controllers/user.controllers");

//Crear el usuario tutor

router.post("/register/tutor", userCon.registerTutorUser);

//Crear el usuario administrador

//Listar los usuarios

//Editar el usuario

//Eliminar el usuario(borrar el tutorid asociado al estudiante).

module.exports = router;

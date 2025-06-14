const router = require("express").Router();
const userCon = require("../../controllers/user.controllers");
const auth = require("../../middleware/auth");

//Crear el usuario tutor

router.post("/register/tutor", userCon.registerTutorUser);

//Crear el usuario administrador

router.post("/register/admin", userCon.registerAdminUser);

//Login de usuario

router.post("/login", userCon.login);

//ruta privada para ir al profile

router.get(
  "/profile/tutor",
  auth.checkToken,
  auth.authorizeRoles("tutor"),
  userCon.getProfile
);

router.get(
  "/profile/admin",
  auth.checkToken,
  auth.authorizeRoles("admin"),
  userCon.getProfile
);

//Listar los usuarios

//Editar el usuario

//Eliminar el usuario(borrar el tutorid asociado al estudiante).

module.exports = router;


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
  auth.authorizeRoles("administrador"),
  userCon.getProfile
);

//Listar los usuarios por rol
router.get(
  "/listTutors",
  auth.checkToken,
  auth.authorizeRoles("administrador"),
  userCon.listTutors
);
//Editar el usuario

router.put("/:id", auth.checkToken, userCon.updateUser);

//Eliminar el usuario(borrar el tutorid asociado al estudiante).
router.patch(
  "/softdelete/:id",
  auth.checkToken,
  auth.authorizeRoles("administrador"),
  userCon.softDeleteUser
);

module.exports = router;


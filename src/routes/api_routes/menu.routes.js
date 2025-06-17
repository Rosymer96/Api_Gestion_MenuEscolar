const router = require("express").Router();
const menuCon = require("../../controllers/menu.controllers");

//Crear el menu asignandole 3 platos, fecha y la clase.

router.post("/create", menuCon.createMenu);

//Listar menu por clase recibe un queryparams
router.post("/list/:classId", menuCon.listByClassMonth);
//Editar el menu

//Borrar Menu

module.exports = router;

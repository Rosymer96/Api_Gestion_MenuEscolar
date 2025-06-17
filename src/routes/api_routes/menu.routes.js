const router = require("express").Router();
const menuCon = require("../../controllers/menu.controllers");

//Crear el menu asignandole 3 platos, fecha y la clase.

router.post("/create", menuCon.createMenu);

//menuId y platos a tabla MenuDish

//Listar menu por clase

//Editar el menu

//Borrar Menu

module.exports = router;

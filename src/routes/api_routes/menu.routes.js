const router = require("express").Router();
const menuCon = require("../../controllers/menu.controllers");
const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú
router.use(checkToken, authorizeRoles("administrador")); // solo tutores pueden acceder

//Crear el menu asignandole 3 platos, fecha y la clase.

router.post("/create", menuCon.createMenu);

// Obtener menú por clase y fecha (query: ?classId=1&date=YYYY-MM-DD)
router.get("/byClassAndDate", menuCon.getMenuByClassAndDate);

//Listar menu por clase recibe un queryparams
router.get("/listByClass/:classId", menuCon.listByClassMonth);
//Editar el menu
router.put("/:menuId", menuCon.updateMenu);
//Borrar Menu
router.delete("/:menuId", menuCon.deleteMenu);

module.exports = router;

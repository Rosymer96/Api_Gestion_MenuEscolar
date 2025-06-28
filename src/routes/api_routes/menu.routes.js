const router = require("express").Router();
const menuCon = require("../../controllers/menu.controllers");
const { checkToken, authorizeRoles } = require("../../middleware/auth");

//Crear el menu asignandole 3 platos, fecha y la clase.

router.post(
  "/create",
  checkToken,
  authorizeRoles("administrador"),
  menuCon.createMenu
);

// Obtener menú por clase y fecha (query: ?classId=1&date=YYYY-MM-DD)
router.get(
  "/byClassAndDate",
  checkToken,
  authorizeRoles("administrador"),
  menuCon.getMenuByClassAndDate
);

//Listar menu por clase recibe un queryparams
router.get("/listByClass/:classId", checkToken, menuCon.listByClassMonth);
//Editar el menu
router.put(
  "/:menuId",
  checkToken,
  authorizeRoles("administrador"),
  menuCon.updateMenu
);
//Borrar Menu
router.delete(
  "/:menuId",
  checkToken,
  authorizeRoles("administrador"),
  menuCon.deleteMenu
);



module.exports = router;

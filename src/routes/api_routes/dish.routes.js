const router = require("express").Router();
const dishCon = require("../../controllers/dish.controllers");

const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú
router.use(checkToken, authorizeRoles("tutor")); // solo tutores pueden acceder

//endpoints para:

// Crear plato
router.post("/create", dishCon.createDish);

// Listar todos los platos
router.get("/list", dishCon.getAllDishes);

// Listar platos por tipo
router.get("/listByType/:dishType", dishCon.getDishesByType);

// Modificar plato
router.put("/:id", dishCon.updateDish);

// Eliminar plato
router.delete("/:id", dishCon.deleteDish);

//Elimar plato de forma logica (cambiar el estado active a FALSE).

router.patch("/softdelete/:id", dishCon.deactiveDish);

module.exports = router;

const router = require("express").Router();
const dishCon = require("../../controllers/dish.controllers");
//endpoints para:

// Crear plato
router.post("/create", dishCon.createDish);

// Listar todos los platos
router.get("/", dishCon.getAllDishes);

// Listar platos por tipo
router.get("/type/:dish_type", dishCon.getDishesByType);

// Modificar plato
router.put("/update/:id", dishCon.updateDish);

// Eliminar plato
router.delete("/delete/:id", dishCon.deleteDish);

module.exports = router;

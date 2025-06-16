const router = require("express").Router();
const dishCon = require("../../controllers/dish.controllers");
//endpoints para:

//Crear plato
router.post("/create", dishCon.addDish);
//Listar plato por tipo

//Modificar plato

//Borrar

module.exports = router;

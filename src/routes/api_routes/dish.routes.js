const router = require("express").Router();
const dishCon = require("../../controllers/dish.controllers");
//endpoints para:

//Crear plato
router.post("/create", dishCon.addDish);
//Listar plato por tipo
router.get("/list", dishCon.list);
//Modificar plato

//Borrar

module.exports = router;

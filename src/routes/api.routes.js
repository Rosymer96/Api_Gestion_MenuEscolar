const router = require("express").Router();

// Rutas de dish activas
router.use("/dish", require("./api_routes/dish.routes"));

// Otras rutas comentadas (descomenta cuando las necesites)
// router.use("/class", require("./api_routes/class.routes"));
// router.use("/menu", require("./api_routes/menu.routes"));
// router.use("/student", require("./api_routes/class.student"));
// router.use("/user", require("./api_routes/class.user"));

module.exports = router;

//IMPORTANTE:   Descomentar  solo el router.use del endpoints que estan creando si no mandara error ().

const router = require("express").Router();

// // router.use("/class", require("./api_routes/class.routes"));
// // router.use("/dish", require("./api_routes/dish.routes"));
// // router.use("/menu", require("./api_routes/menu.routes"));
router.use("/student", require("./api_routes/student.routes"));
// // router.use("/user", require("./api_routes/user.routes"));

module.exports = router;

//IMPORTANTE:   Descomentar  solo el router.use del endpoints que estan creando si no mandara error ().

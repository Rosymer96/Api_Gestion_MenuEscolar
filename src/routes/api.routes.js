const router = require("express").Router();


router.use("/dish", require("./api_routes/dish.routes"));

router.use("/user", require("./api_routes/user.routes"));


router.use("/student", require("./api_routes/student.routes"));

module.exports = router;

//IMPORTANTE:   Descomentar  solo el router.use del endpoints que estan creando si no mandara error ().

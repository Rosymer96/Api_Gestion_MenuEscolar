const dishModel = require("../models/dish.model");

//Crear plato
const addDish = async (req, res) => {
  try {
    const { name, dishType, description } = req.body;
    if (!name || !dishType || !description) {
      return res.status(400).json({
        error:
          "Todos los campos (name, dishType, description) son obligatorios",
      });
    }
    //Compruebo si hay un plato con el mismo nombre:

    const existingDish = await dishModel.selectByName(name);
    if (existingDish) {
      return res
        .status(409)
        .json({ error: "Ya existe un plato con este nombre" });
    }

    //Agregar el plato:
    const result = await dishModel.insertDish(name, dishType, description);
    console.log(result);
    res.status(201).json({ message: "Registrado con exito", data: result });
  } catch (error) {
    console.error("Error al agregar plato:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

//Listas todos los platos(opcional)
const list = async (req, res) => {
  try {
    const result = await dishModel.selectAll();
    if (result.length === 0) {
      return res
        .status(200)
        .json({ message: "No hay platos disponibles", data: [] });
    }
    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
//Listar plato por tipo

//Modificar plato

//Modificar el estado a inactivo

module.exports = { addDish, list };

const dishModel = require("../models/dish.model");

// Crear plato
const createDish = async (req, res) => {
  try {
    const { name, dishType, description } = req.body;

    if (!name || !dishType || !description) {
      return res.status(400).json({
        error:
          "Todos los campos son obligatorios (name, dishType, description)",
      });
    }

    // Verificar si ya existe un plato con ese nombre
    const existingDish = await dishModel.findDishByName(name);
    if (existingDish) {
      return res.status(409).json({
        error: "Ya existe un plato con ese nombre",
      });
    }

    // Agregar el plato
    const newDish = await dishModel.createDish(name, dishType, description);

    res.status(201).json({
      message: "Plato creado correctamente",
      dishId: newDish.insertId,
    });
  } catch (error) {
    console.error("Error al crear el plato", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Listar todos los platos
const getAllDishes = async (req, res) => {
  try {
    const dishes = await dishModel.getAllDishes();

    res.status(200).json({
      success: true,
      data: dishes,
      count: dishes.length,
    });
  } catch (error) {
    console.error("Error en getAllDishes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Listar platos por tipo
const getDishesByType = async (req, res) => {
  try {
    const { dishType } = req.params;

    if (!dishType) {
      return res.status(400).json({
        error: "El tipo de plato es obligatorio",
      });
    }
    const validTypes = ["primero", "segundo", "postre"];

    if (!validTypes.includes(dishType)) {
      return res.status(400).json({
        error:
          "El tipo de plato no es válido. Debe ser 'primero', 'segundo' o 'postre'.",
      });
    }

    const dishes = await dishModel.getDishesByType(dishType);

    res.status(200).json({
      success: true,
      data: dishes,
      count: dishes.length,
    });
  } catch (error) {
    console.error("Error en getDishesByType:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Modificar plato
const updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dishType, description } = req.body;

    if (!name || !dishType || !description) {
      return res.status(400).json({
        error:
          "Todos los campos son obligatorios (name, dishType, description)",
      });
    }

    const dishId = parseInt(id);
    if (isNaN(dishId)) {
      return res.status(400).json({
        error: "ID del plato debe ser un número válido",
      });
    }

    const existingDish = await dishModel.getDishById(dishId);
    if (!existingDish) {
      return res.status(404).json({
        error: "Plato no encontrado",
      });
    }

    const dishWithSameName = await dishModel.findDishByName(name);
    if (dishWithSameName && dishWithSameName.idDish != dishId) {
      return res.status(409).json({
        error: "Ya existe otro plato con ese nombre",
      });
    }

    const updatedDish = await dishModel.updateDish(
      dishId,
      name,
      dishType,
      description
    );

    if (updatedDish.affectedRows === 0) {
      return res.status(404).json({
        error: "No se pudo actualizar el plato",
      });
    }

    res.status(200).json({
      message: "Plato actualizado correctamente",
    });
  } catch (error) {
    console.error("Error en updateDish:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar plato
const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;

    const dishId = parseInt(id);
    if (isNaN(dishId)) {
      return res.status(400).json({
        error: "ID del plato debe ser un número válido",
      });
    }

    const existingDish = await dishModel.getDishById(dishId);
    if (!existingDish) {
      return res.status(404).json({
        error: "Plato no encontrado",
      });
    }

    const deletedDish = await dishModel.deleteDish(dishId);

    if (deletedDish.affectedRows === 0) {
      return res.status(404).json({
        error: "No se pudo eliminar el plato",
      });
    }

    res.status(200).json({
      message: "Plato eliminado correctamente",
    });
  } catch (error) {
    console.error("Error en deleteDish:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Eliminar plato de forma lógica (cambiar el estado active a FALSE).
const deactiveDish = async (req, res) => {
  try {
    const { id } = req.params;

    const dishId = parseInt(id);
    if (isNaN(dishId)) {
      return res.status(400).json({
        error: "ID del plato debe ser un número válido",
      });
    }

    const existingDish = await dishModel.getDishById(dishId);
    if (!existingDish) {
      return res.status(404).json({
        error: "Plato no encontrado",
      });
    }

    const result = await dishModel.deactiveDish(dishId);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Plato no encontrado o ya inactivo" });
    }

    res
      .status(200)
      .json({ message: "Plato marcado como inactivo", data: result });
  } catch (error) {
    console.error("Error en el servidor al desactivar el plato.", error);
    res.status(500).json({ success: false, message: "Error interno" });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishesByType,
  updateDish,
  deleteDish,
  deactiveDish,
};

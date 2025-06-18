const dishModel = require("../models/dish.model");

// Crear plato
const createDish = async (req, res) => {
  try {
    const { name, dish_type, description } = req.body;

    if (!name || dish_type === undefined || !description) {
      return res.status(400).json({ 
        error: "Todos los campos son obligatorios (name, dish_type, description)" 
      });
    }

    // Convertir dish_type a número y validar
    const dishTypeNumber = parseInt(dish_type);
    if (isNaN(dishTypeNumber)) {
      return res.status(400).json({
        error: "dish_type debe ser un número válido (1=Entrada, 2=Principal, 3=Postre, etc.)"
      });
    }

    // Verificar si ya existe un plato con ese nombre
    const existingDish = await dishModel.findDishByName(name);
    if (existingDish) {
      return res.status(409).json({
        error: "Ya existe un plato con ese nombre"
      });
    }

    const newDish = await dishModel.createDish(name, dishTypeNumber, description);
    
    res.status(201).json({
      message: "Plato creado correctamente",
      dishId: newDish.insertId
    });

  } catch (error) {
    console.error("Error en createDish:", error);
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
      count: dishes.length
    });

  } catch (error) {
    console.error("Error en getAllDishes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Listar platos por tipo
const getDishesByType = async (req, res) => {
  try {
    const { dish_type } = req.params;

    if (!dish_type) {
      return res.status(400).json({
        error: "El tipo de plato es obligatorio"
      });
    }

    // Convertir a número
    const dishTypeNumber = parseInt(dish_type);
    if (isNaN(dishTypeNumber)) {
      return res.status(400).json({
        error: "dish_type debe ser un número válido"
      });
    }

    const dishes = await dishModel.getDishesByType(dishTypeNumber);
    
    res.status(200).json({
      success: true,
      data: dishes,
      count: dishes.length
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
    const { name, dish_type, description } = req.body;

    if (!name || dish_type === undefined || !description) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios (name, dish_type, description)"
      });
    }

    // Convertir dish_type a número y validar
    const dishTypeNumber = parseInt(dish_type);
    if (isNaN(dishTypeNumber)) {
      return res.status(400).json({
        error: "dish_type debe ser un número válido"
      });
    }

    // Convertir id a número
    const dishId = parseInt(id);
    if (isNaN(dishId)) {
      return res.status(400).json({
        error: "ID del plato debe ser un número válido"
      });
    }

    // Verificar si el plato existe
    const existingDish = await dishModel.getDishById(dishId);
    if (!existingDish) {
      return res.status(404).json({
        error: "Plato no encontrado"
      });
    }

    // Verificar si ya existe otro plato con ese nombre
    const dishWithSameName = await dishModel.findDishByName(name);
    if (dishWithSameName && dishWithSameName.idDish != dishId) {
      return res.status(409).json({
        error: "Ya existe otro plato con ese nombre"
      });
    }

    const updatedDish = await dishModel.updateDish(dishId, name, dishTypeNumber, description);
    
    if (updatedDish.affectedRows === 0) {
      return res.status(404).json({
        error: "No se pudo actualizar el plato"
      });
    }

    res.status(200).json({
      message: "Plato actualizado correctamente"
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

    // Convertir id a número
    const dishId = parseInt(id);
    if (isNaN(dishId)) {
      return res.status(400).json({
        error: "ID del plato debe ser un número válido"
      });
    }

    // Verificar si el plato existe
    const existingDish = await dishModel.getDishById(dishId);
    if (!existingDish) {
      return res.status(404).json({
        error: "Plato no encontrado"
      });
    }

    const deletedDish = await dishModel.deleteDish(dishId);
    
    if (deletedDish.affectedRows === 0) {
      return res.status(404).json({
        error: "No se pudo eliminar el plato"
      });
    }

    res.status(200).json({
      message: "Plato eliminado correctamente"
    });

  } catch (error) {
    console.error("Error en deleteDish:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishesByType,
  updateDish,
  deleteDish
};
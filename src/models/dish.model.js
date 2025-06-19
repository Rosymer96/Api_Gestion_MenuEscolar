// Modelo de datos para dish
const pool = require("../config/conexion");

// SQL para el CRUD de platos

// Crear plato
const createDish = async (name, dish_type, description) => {
  const insert = "INSERT INTO Dish (name, dish_type, description) VALUES (?, ?, ?)";
  const [result] = await pool.query(insert, [name, dish_type, description]);
  return { result };
};

// Buscar plato por nombre
const findDishByName = async (name) => {
  const select = "SELECT * FROM Dish WHERE name = ?";
  const [result] = await pool.query(select, [name]);
  return result[0];
};

// Obtener todos los platos
const getAllDishes = async () => {
  const select = "SELECT * FROM Dish ORDER BY name";
  const [result] = await pool.query(select);
  return result;
};

// Obtener platos por tipo
const getDishesByType = async (dish_type) => {
  const select = "SELECT * FROM Dish WHERE dish_type = ? ORDER BY name";
  const [result] = await pool.query(select, [dish_type]);
  return result;
};

// Obtener plato por ID
const getDishById = async (id) => {
  const select = "SELECT * FROM Dish WHERE idDish = ?";
  const [result] = await pool.query(select, [id]);
  return result[0];
};

// Actualizar plato
const updateDish = async (id, name, dish_type, description) => {
  const update = "UPDATE Dish SET name = ?, dish_type = ?, description = ? WHERE idDish = ?";
  const [result] = await pool.query(update, [name, dish_type, description, id]);
  return result;
};

// Eliminar plato (eliminación real, no soft delete)
const deleteDish = async (id) => {
  const deleteQuery = "DELETE FROM Dish WHERE idDish = ?";
  const [result] = await pool.query(deleteQuery, [id]);
  return result;
};

module.exports = {
  createDish,
  findDishByName,
  getAllDishes,
  getDishesByType,
  getDishById,
  updateDish,
  deleteDish
};
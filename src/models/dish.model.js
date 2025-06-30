// Modelo de datos para dish
const pool = require("../config/conexion");

// SQL para el CRUD de platos

// Crear plato
const createDish = async (name, dishType, description) => {
  const insert =
    "INSERT INTO Dish (name, dish_type, description) VALUES (?, ?, ?)";
  const [result] = await pool.query(insert, [name, dishType, description]);
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

const getAllDishesActive = async () => {
  const select = "SELECT * FROM Dish WHERE active = 1 ORDER BY name";
  const [result] = await pool.query(select);
  return result;
};

// Obtener platos por tipo
const getDishesByType = async (dishType) => {
  const select = "SELECT * FROM Dish WHERE dish_type = ? ORDER BY name";
  const [result] = await pool.query(select, [dishType]);
  return result;
};

// Obtener plato por ID
const getDishById = async (id) => {
  const select = "SELECT * FROM Dish WHERE idDish = ?";
  const [result] = await pool.query(select, [id]);
  return result[0];
};

// Actualizar plato
const updateDish = async (id, name, dishType, description, active) => {
  const update =
    "UPDATE Dish SET name = ?, dish_type = ?, description = ?, active = ? WHERE idDish = ?";
  const [result] = await pool.query(update, [
    name,
    dishType,
    description,
    active,
    id,
  ]);
  return result;
};

// Eliminar plato (eliminación real, no soft delete)
// Eliminación real del plato y sus referencias en MenuDish
const deleteDish = async (id) => {
  // Primero elimina las referencias en MenuDish
  const deleteReferencesQuery = "DELETE FROM MenuDish WHERE dish_id = ?";
  await pool.query(deleteReferencesQuery, [id]);

  // Luego elimina el plato en sí
  const deleteDishQuery = "DELETE FROM Dish WHERE idDish = ?";
  const [result] = await pool.query(deleteDishQuery, [id]);

  return result;
};


//Elimar plato de forma logica (cambiar el estado active a FALSE).
const deactiveDish = async (id) => {
  const desactive =
    "UPDATE Dish SET active = FALSE WHERE idDish = ? AND active = TRUE";
  const [result] = await pool.query(desactive, [id]);
  return result;
};

module.exports = {
  createDish,
  findDishByName,
  getAllDishes,
  getDishesByType,
  getDishById,
  updateDish,
  deleteDish,
  deactiveDish,
  getAllDishesActive,
};

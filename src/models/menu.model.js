//modelo de datos
const pool = require("../config/conexion");

//Sql para el CRUD del menu
//Crear el menu asignandole 3 platos, fecha y la clase.

//fecha y clase a tabla Menu
const insertMenu = async (date, classId) => {
  const insert = "INSERT INTO Menu (date, class_id) VALUES (?,?)";
  const [result] = await pool.query(insert, [date, classId]);
  return result;
};

//menuId y platos a tabla MenuDish
const insertMenuDish = async (menuId, dishId) => {
  const insert = "INSERT INTO MenuDish (menu_id, dish_id) VALUES (?,?)";
  const [result] = await pool.query(insert, [menuId, dishId]);
  return result;
};

//Listar menu por clase
const listMenuByMonth = async (classId, startDate, endDate) => {
  const selectByClassAndMonth = `
    SELECT 
      m.idMenu AS idMenu,
      DATE_FORMAT(m.date, '%Y-%m-%d') AS date, 
      d.idDish AS id, 
      d.name AS dish, 
      d.dish_type, 
      d.description
    FROM Menu m 
    JOIN MenuDish md ON m.idMenu = md.menu_id 
    JOIN Dish d ON md.dish_id = d.idDish 
    WHERE m.class_id = ? 
      AND m.date BETWEEN ? AND LAST_DAY(?) 
    ORDER BY m.date ASC, FIELD(d.dish_type, 'primero', 'segundo', 'postre');
  `;

  const [result] = await pool.query(selectByClassAndMonth, [
    classId,
    startDate,
    endDate,
  ]);
  return result;
};

//Editar el menu (Borrar MenuDish y insertar nuevos platos.)

const deleteMenuDishes = async (menuId) => {
  const deleteDishes = "DELETE FROM MenuDish WHERE menu_id = ?";
  const [result] = await pool.query(deleteDishes, [menuId]);
  return result;
};

//Borrar Menu

const deleteMenu = async (menuId) => {
  const deleteMEnu = "DELETE FROM Menu WHERE idMenu = ?";
  const [result] = await pool.query(deleteMEnu, [menuId]);
  return result;
};

//Obtener plato por id:

const selectDishById = async (id) => {
  const select = "SELECT * FROM Dish WHERE idDish = ?";
  const [result] = await pool.query(select, [id]);
  return result[0];
};

//obtener plato existente en la fecha y la clase
const selectMenuInClassByDate = async (classId, date) => {
  const select = "SELECT * FROM Menu WHERE class_id = ? AND date = ?";
  const [result] = await pool.query(select, [classId, date]);
  return result[0];
};

const selectMenuById = async (idMenu) => {
  const select = "SELECT * FROM Menu WHERE idMenu = ?";
  const [result] = await pool.query(select, [idMenu]);
  return result[0];
};

const getDishesByMenuId = async (menuId) => {
  const select = `
    SELECT 
      d.idDish AS id, 
      d.name, 
      d.dish_type, 
      d.description
    FROM MenuDish md
    JOIN Dish d ON md.dish_id = d.idDish
    WHERE md.menu_id = ?
    ORDER BY FIELD(d.dish_type, 'primero', 'segundo', 'postre')`;

  const [result] = await pool.query(select, [menuId]);
  return result;
};

module.exports = {
  insertMenu,
  insertMenuDish,
  listMenuByMonth,
  deleteMenuDishes,
  deleteMenu,
  selectDishById,
  selectMenuInClassByDate,
  selectMenuById,
  getDishesByMenuId,
};

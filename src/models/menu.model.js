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
  //SELECT DATE_FORMAT(m.date, '%Y-%m-%d') le quita la hora a la fecha.
  const selectByClassAndMoth =
    "SELECT DATE_FORMAT(m.date, '%Y-%m-%d') AS date, d.name AS dish FROM Menu m JOIN MenuDish md ON m.idMenu = md.menu_id JOIN Dish d ON md.dish_id = d.idDish WHERE m.class_id = ? AND m.date BETWEEN ? AND ? ORDER BY m.date ASC";
  const [result] = await pool.query(selectByClassAndMoth, [
    classId,
    startDate,
    endDate,
  ]);
  return result;
};

//Editar el menu

//Borrar Menu

module.exports = { insertMenu, insertMenuDish, listMenuByMonth };

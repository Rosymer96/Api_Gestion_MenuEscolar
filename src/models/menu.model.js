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

//Editar el menu

//Borrar Menu

module.exports = { insertMenu, insertMenuDish };

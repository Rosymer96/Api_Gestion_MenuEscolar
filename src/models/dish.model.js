const pool = require("../config/conexion");

//Sql para el CRUD del dish

//Crear el dish
const insertDish = async (name, dishType, description) => {
  const insert =
    "INSERT INTO Dish (name,dish_type,description ) VALUES (?,?,?)";
  const [result] = await pool.query(insert, [name, dishType, description]);
  return result;
};

//Buscar un plato por nombre

const selectByName = async (name) => {
  const select = "SELECT * FROM Dish WHERE name = ? ";
  const [result] = await pool.query(select, [name]);
  return result[0];
};

//Listar:  todos  siempre que su active este en TRUE(importante hacer esa condicion)
const selectDishBytype = async (dishType) => {};
//Editar plato

//Eliminar plato (OJO: cambiando el active a FALSE) NO BORRANDO EL PLATO PORQUE SINO AFECTARA MENUS ANTIGUOS ASOCIADOS A ESE PLATO;

module.exports = { insertDish, selectByName };

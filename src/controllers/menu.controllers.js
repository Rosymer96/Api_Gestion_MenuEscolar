const e = require("cors");
const menuModel = require("../models/menu.model");

//Crear el menu asignandole 3 platos, fecha y la clase.
const createMenu = async (req, res) => {
  try {
    //req: fecha, clase, ids de los platos(3)
    const { date, classId, firstId, secondId, dessertId } = req.body;
    if (!date || !classId || !firstId || !secondId || !dessertId) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    //Verificar si los platos existen
    const dishIds = [firstId, secondId, dessertId];

    //Verificar si ya hay un menu con esa fecha y classId:
    const existingMenu = await menuModel.selectMenuInClassByDate(classId, date);
    if (existingMenu) {
      res.status(404).json({
        error: "Ya existe un menu asignado a esta clase en esta fecha.",
      });
    }
    for (const dishId of dishIds) {
      const dish = await menuModel.selectDishById(dishId);
      if (!dish) {
        return res.status(404).json({
          error: "Plato no encontrado",
        });
      }
    }

    //fecha y clase a tabla Menu

    const menu = await menuModel.insertMenu(date, classId);
    const menuId = menu.insertId;
    //menuId y platos a tabla MenuDish
    for (const dishId of dishIds) {
      await menuModel.insertMenuDish(menuId, dishId);
    }
    res.status(201).json({
      message: "Menu creado correctamente",
      newMenu: menuId, //Consultar que es lo que debo devolver?
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor al crear al menu" });
  }
};

//Listar menu por clase
const listByClassMonth = async (req, res) => {
  try {
    const { classId } = req.params;
    const { monthDate } = req.query;
    if (!classId || !monthDate) {
      return res
        .status(400)
        .json({ message: "Faltan parámetros: clase y mes son obligatorios" });
    }
    const [month, year] = monthDate.split("-");
    const startDate = `${year}-${month}-01`;
    const endDate = new Date(year, parseInt(month), 1)
      .toISOString()
      .split("T")[0];

    const menus = await menuModel.listMenuByMonth(classId, startDate, endDate);
    //Ordenar la data para que el frontend lareciba limpia y ordenada:
    if (menus.length === 0) {
      return res.status(404).json({
        error: "No existen platos registrados durante este mes.",
      });
    }
    const menuByDays = {};
    for (const menu of menus) {
      if (!menuByDays[menu.date]) {
        menuByDays[menu.date] = {
          date: menu.date,
          dishes: [],
        };
      }
      menuByDays[menu.date].dishes.push(menu.dish);
    }

    console.log("Menus devueltos:", menuByDays, classId, startDate, endDate);
    res.status(200).json({
      message: "Success",
      dateRange: { start: startDate, end: endDate },
      classId: classId,
      menus: menuByDays,
    });
  } catch (error) {
    console.error("Error en el servidor al listar el menu:", error);
    res.status(500).json({ error: "Error del servidor." });
  }
};
//Editar el menu
const updateMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { firstId, secondId, dessertId } = req.body;

    if (!menuId || !firstId || !secondId || !dessertId) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }
    //Verificamos si existe el menu

    const existingMenu = await menuModel.selectMenuById(menuId);
    if (!existingMenu) {
      return res.status(404).json({
        error: "No existe un menú con este ID.",
      });
    }

    //Borrar los platos anteriores del menu:
    await menuModel.deleteMenuDishes(menuId);
    //Insertamos nuevos platos:

    const newDishes = [firstId, secondId, dessertId];
    for (const dish of newDishes) {
      await menuModel.insertMenuDish(menuId, dish);
    }
    res.status(200).json({ message: "Menú actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error en el servidor al actualizar el menú" });
  }
};
//Borrar Menu

const deleteMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    if (!menuId) {
      return res
        .status(400)
        .json({ error: "Enviar el menuId es obligatorio." });
    }
    //Verificamos si existe el menu

    const existingMenu = await menuModel.selectMenuById(menuId);
    if (!existingMenu) {
      return res.status(404).json({
        error: "No existe un menú con este ID.",
      });
    }

    //Borrar todos los platos asociados a este menuId de MenuDish:
    await menuModel.deleteMenuDishes(menuId);
    //Borrar el menu de la tabla Menu:
    await menuModel.deleteMenu(menuId);
    res.status(200).json({ message: "Menú eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor al eliminar el menú" });
  }
};

module.exports = { createMenu, listByClassMonth, updateMenu, deleteMenu };

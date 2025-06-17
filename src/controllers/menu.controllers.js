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
    //fecha y clase a tabla Menu

    const menu = await menuModel.insertMenu(date, classId);
    const menuId = menu.insertId;
    //menuId y platos a tabla MenuDish
    const dishIds = [firstId, secondId, dessertId];
    for (const dish of dishIds) {
      await menuModel.insertMenuDish(menuId, dish);
    }
    res.status(201).json({
      message: "Menu creado correctamente",
      newMenu: menuId, //Consultar que es lo que debo devolver?
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
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

    
    const menuByDays = {};
    for (const menu of menus) {
      //Quitarle la hora a la fecha que recibimos de la BD.
      const formattedDate = new Date(menu.date).toISOString().split("T")[0];

      if (!menuByDays[formattedDate]) {
        menuByDays[formattedDate] = {
          date: formattedDate,
          dishes: [],
        };
      }
      menuByDays[formattedDate].dishes.push(menu.dish);
    }

    console.log("Menus devueltos:", menuByDays, classId, startDate, endDate);
    res.status(200).json({ message: "Success", Menus: menuByDays });
  } catch (error) {
    console.error("Error al listar el menu:", error);
    res.status(500).json({ error: "Error del servidor." });
  }
};
//Editar el menu

//Borrar Menu

module.exports = { createMenu, listByClassMonth };

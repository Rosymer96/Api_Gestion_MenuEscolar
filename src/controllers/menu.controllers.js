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

//Editar el menu

//Borrar Menu

module.exports = { createMenu };

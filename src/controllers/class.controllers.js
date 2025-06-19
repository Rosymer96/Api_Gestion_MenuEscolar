const classModels = require("../models/class.model");

const getAllClasses = async (req, res) => {
  try {
    const foundClass = await classModels.selectAll();
    res.status(200).json({
      success: true,
      data: foundClass,
      count: foundClass.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor al listar las clases." });
  }
};

const newClass = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios (name)",
      });
    }

    // Verificar si ya existe una clase con ese nombre
    const existingClass = await classModels.findClassByName(req.body.name);
    if (existingClass) {
      return res.status(409).json({
        error: "Ya existe una clase con ese nombre",
      });
    }

    //Agregar la clase
    const createdClass = await classModels.createClass(req.body.name);

    res.status(201).json({
      message: "Clase creada correctamente",
      classId: createdClass.insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor al crear la clase" });
  }
};

const findClassById = async (req, res) => {
  try {
    // Validar si el id es un  número
    if (isNaN(req.params.id)) {
      return res.status(400).json({
        error: "ID de la clase debe ser un número válido",
      });
    }

    const classFound = await classModels.findClassById(req.params.id);
    if (!classFound) {
      return res.status(404).json({
        error: "Clase no encontrada.",
      });
    }
    res.status(200).json({
      message: "Clase encontrada",
      data: classFound,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error del servidor al buscar la clase por el id" });
  }
};

const updateClass = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios (id, name)",
      });
    }

    //Verificar si la clase existe:

    const existingClass = await classModels.findClassById(req.params.id);
    if (!existingClass) {
      return res.status(404).json({
        error: "Clase no encontrado",
      });
    }
    const updatedClass = await classModels.updateClass(
      req.body.name,
      req.params.id
    );

    if (updateClass.affectedRows === 0) {
      return res.status(404).json({
        error: "No se pudo actualizar la clase.",
      });
    }

    res.status(200).json({
      msg: "clase modificada",
      data: updatedClass,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error del servidor al modificar la clase " });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar si el id es un  número
    if (isNaN(id)) {
      return res.status(400).json({
        error: "ID de la clase debe ser un número válido",
      });
    }

    //Verificar si la clase existe:
    const existingClass = await classModels.findClassById(id);
    if (!existingClass) {
      return res.status(404).json({
        error: "Clase no encontrado",
      });
    }

    const deletedClass = await classModels.eliminarClass(id);
    res.status(200).json({
      message: "Clase eliminada con exito ",
      data: deletedClass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor al eliminar la clase " });
  }
};
module.exports = {
  getAllClasses,
  newClass,
  findClassById,
  updateClass,
  deleteClass,
};

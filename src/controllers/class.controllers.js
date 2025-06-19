const classModels = require("../models/class.model");

const getAllClasses = async (req, res) => {
  try {
    const foundClass = await classModels.selectAll();
    res.json(foundClass);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor al buscar la clase" });
  }
};

const newClass = async (req, res) => {
  try {
    const createdClass = await classModels.createClass(req.body.nombre);
    if (!createdClass) {
      res.status(400).json({ msg: "La clase no se ha creado" });
    }
    res.status(201).json({ classId: createdClass.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor al crear la clase" });
  }
};

const findClassById = async (req, res) => {
  try {
    const classFound = await classModels.findClass(req.params.id);
    res.json({
      msg: "ok ",
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
    const updatedClass = await classModels.modificarClass(
      req.params.id,
      req.body
    );
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
  const { id } = req.params;
  const deletedClass = await classModels.eliminarClass(id);
  res.status(200).json({
    msg: "Clase eliminada con exito ",
    data: deletedClass,
  });
};
module.exports = {
  getAllClasses,
  newClass,
  findClassById,
  updateClass,
  deleteClass,
};

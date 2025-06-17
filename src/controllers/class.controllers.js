const classModels = require("../models/class.model");

const getAllClasses = async (req, res) => {
  try {
    const foundClass = await classModels.selectAll();
    res.json(foundClass);
  } catch (error) {
    res.json(error);
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
    res.status(500).json(error);
  }
};

const findClassById = async (req, res) => {
  try {
    const classFound = await classModels.findClass(req.params.id);
    res.json({
      msg : "ok ",
      data : classFound
    });
  } catch (error) {
    res.json(error);
  }
};

const updateClass = async (req, res) => {
try {
  const updatedClass = await classModels.modificarClass(req.params.id, req.body);
  res.json({
    msg: "clase modificada",
    data: updatedClass
  })
} catch (error) {
  res.json(error);
}
}

module.exports = { getAllClasses, newClass, findClassById, updateClass };


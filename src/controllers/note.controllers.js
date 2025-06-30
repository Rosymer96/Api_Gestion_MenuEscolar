const menuNoteModel = require("../models/note.model");

// GET /api/menu-notes/:menuId
const getNote = async (req, res) => {
  const tutorId = req.userLogin.id; //viene del middelware
  const { menuId } = req.params;

  try {
    const note = await menuNoteModel.getNoteByMenuAndTutor(menuId, tutorId);
    if (!note) return res.status(404).json({ note: null });

    res.status(200).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener la nota" });
  }
};

// POST /api/menu-notes
const createNote = async (req, res) => {
  const tutorId = req.userLogin.id;
  const { menuId, note } = req.body;

  try {
    await menuNoteModel.createNote(menuId, tutorId, note);
    res.status(201).json({ message: "Nota creada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear la nota" });
  }
};

const updateNote = async (req, res) => {
  const tutorId = req.userLogin.id;
  const { menuId, note } = req.body;

  try {
    await menuNoteModel.updateNote(note, menuId, tutorId);
    res.status(200).json({ message: "Nota actualizada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar la nota" });
  }
};

const deleteNote = async (req, res) => {
  const tutorId = req.userLogin.id;
  const { menuId } = req.params;

  try {
    await menuNoteModel.deleteNote(menuId, tutorId);
    res.status(200).json({ message: "Nota eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar la nota" });
  }
};

const saveNote = async (req, res) => {
  const tutorId = req.userLogin.id;
  const { menuId, note } = req.body;

  try {
    const existingNote = await menuNoteModel.getNoteByMenuAndTutor(menuId, tutorId);
    console.log(existingNote);
    if (existingNote) {
      await menuNoteModel.updateNote(note, menuId, tutorId);
      res.status(200).json({ message: "Nota actualizada correctamente" });
    } else {
      await menuNoteModel.createNote(menuId, tutorId, note);
      res.status(201).json({ message: "Nota creada correctamente" });
    }
  } catch (err) {
    console.error("Error en saveNote:", err);
    res.status(500).json({ error: "err" });
  }
};

module.exports = {
  getNote,
  createNote,
  updateNote,
  deleteNote,
  saveNote,
};

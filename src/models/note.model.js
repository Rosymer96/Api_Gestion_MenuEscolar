//modelo de datos
const pool = require("../config/conexion");

//Sql para el CRUD de la nota:

// Obtener nota por menú y tutor
const getNoteByMenuAndTutor = async (menuId, tutorId) => {
  const select = "SELECT * FROM MenuNote WHERE menu_id = ? AND tutor_id = ?";
  const [result] = await pool.query(select, [menuId, tutorId]);
  return result[0];
};

// Crear nueva nota
const createNote = async (menuId, tutorId, note) => {
  const insert = "INSERT INTO MenuNote (menu_id, tutor_id, note) VALUES (?, ?, ?)";
  await pool.query(insert, [menuId, tutorId, note]);
};

// Actualizar nota existente
const updateNote = async (menuId, tutorId, note) => {
  const update = "UPDATE MenuNote SET note = ? WHERE menu_id = ? AND tutor_id = ?";
  await pool.query(update, [note, menuId, tutorId]);
};

// Eliminar nota
const deleteNote = async (menuId, tutorId) => {
  const del = "DELETE FROM MenuNote WHERE menu_id = ? AND tutor_id = ?";
  await pool.query(del, [menuId, tutorId]);
};

module.exports = {
  getNoteByMenuAndTutor,
  createNote,
  updateNote,
  deleteNote,
};
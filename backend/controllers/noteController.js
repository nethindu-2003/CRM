const { getNotesByLead: fetchNotesByLead, createNote: insertNote } = require('../src/dataconnect-admin-generated');

const getNotesByLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const response = await fetchNotesByLead({ leadId });
    res.json(response.data.notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const leadId = req.params.id;
    
    const newNote = {
      leadId: leadId,
      content,
      createdBy: req.user.id,
      createdByName: req.user.name,
      createdAt: new Date().toISOString()
    };
    
    const response = await insertNote(newNote);
    res.json({ id: response.data.note_insert, ...newNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNotesByLead, createNote };

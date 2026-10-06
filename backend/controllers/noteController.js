const { Note } = require('../models');

const getNotesByLead = async (req, res) => {
  try {
    const leadId = req.params.id;
    const notes = await Note.findAll({ where: { leadId }, order: [['createdAt', 'DESC']] });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const leadId = req.params.id;
    
    const newNote = await Note.create({
      leadId: leadId,
      content,
      createdBy: req.user.id,
      createdByName: req.user.name
    });
    
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNotesByLead, createNote };

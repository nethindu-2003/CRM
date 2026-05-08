const db = require('../config/database');

const getNotesByLead = (req, res) => {
  const sql = `
    SELECT n.*, u.name as created_by_name 
    FROM notes n 
    JOIN users u ON n.created_by = u.id 
    WHERE n.lead_id = ? 
    ORDER BY n.created_at DESC
  `;
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const createNote = (req, res) => {
  const { content } = req.body;
  const sql = `INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)`;
  const params = [req.params.id, content, req.user.id];
  
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, lead_id: req.params.id, content, created_by: req.user.id });
  });
};

module.exports = { getNotesByLead, createNote };

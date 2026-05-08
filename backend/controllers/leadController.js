const db = require('../config/database');
const { Parser } = require('json2csv');
const csv = require('csv-parser');
const fs = require('fs');

const getLeads = (req, res) => {
  let query = 'SELECT * FROM leads WHERE 1=1';
  const params = [];
  
  if (req.query.status) {
    query += ' AND status = ?';
    params.push(req.query.status);
  }
  if (req.query.source) {
    query += ' AND source = ?';
    params.push(req.query.source);
  }
  if (req.query.salesperson) {
    query += ' AND salesperson = ?';
    params.push(req.query.salesperson);
  }
  if (req.query.search) {
    query += ' AND (name LIKE ? OR company LIKE ? OR email LIKE ?)';
    const searchParam = `%${req.query.search}%`;
    params.push(searchParam, searchParam, searchParam);
  }
  
  query += ' ORDER BY updated_at DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

const createLead = (req, res) => {
  const { name, company, email, phone, source, salesperson, status, value } = req.body;
  const sql = `INSERT INTO leads (name, company, email, phone, source, salesperson, status, value) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [name, company, email, phone, source, salesperson, status || 'New', value || 0];
  
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, ...req.body, status: status || 'New', value: value || 0 });
  });
};

const getLeadById = (req, res) => {
  db.get(`SELECT * FROM leads WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Lead not found' });
    res.json(row);
  });
};

const updateLead = (req, res) => {
  const { name, company, email, phone, source, salesperson, status, value } = req.body;
  const sql = `UPDATE leads SET 
                name = ?, company = ?, email = ?, phone = ?, 
                source = ?, salesperson = ?, status = ?, value = ?, 
                updated_at = CURRENT_TIMESTAMP 
               WHERE id = ?`;
  const params = [name, company, email, phone, source, salesperson, status, value, req.params.id];
  
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead updated successfully' });
  });
};

const deleteLead = (req, res) => {
  db.run(`DELETE FROM leads WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  });
};

const updateLeadStatus = (req, res) => {
  const { status } = req.body;
  const sql = `UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  
  db.run(sql, [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead status updated successfully' });
  });
};

const exportLeadsCSV = (req, res) => {
  db.all('SELECT * FROM leads', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    
    try {
      const parser = new Parser();
      const csvData = parser.parse(rows);
      
      res.header('Content-Type', 'text/csv');
      res.attachment('leads.csv');
      res.send(csvData);
    } catch (parseErr) {
      res.status(500).json({ error: parseErr.message });
    }
  });
};

const importLeadsCSV = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const results = [];
  const errors = [];
  
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.unlinkSync(req.file.path); // remove temp file
      
      if (results.length === 0) return res.json({ message: 'Import completed', successCount: 0 });
      
      const sql = `INSERT INTO leads (name, company, email, phone, source, salesperson, status, value) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                   
      const stmt = db.prepare(sql);
      
      db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        
        results.forEach((row) => {
          const params = [
            row.name || 'Unknown', 
            row.company || '', 
            row.email || '', 
            row.phone || '', 
            row.source || 'Website', 
            row.salesperson || '', 
            row.status || 'New', 
            parseFloat(row.value) || 0
          ];
          
          stmt.run(params, (err) => {
            if (err) errors.push(err.message);
          });
        });
        
        stmt.finalize();
        db.run('COMMIT', (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ 
            message: 'Import completed', 
            successCount: results.length - errors.length,
            errors 
          });
        });
      });
    });
};

module.exports = { 
  getLeads, createLead, getLeadById, updateLead, deleteLead, updateLeadStatus, exportLeadsCSV, importLeadsCSV 
};

const { Lead } = require('../models');
const { Op } = require('sequelize');

const getLeads = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    if (req.query.source) where.source = req.query.source;
    if (req.query.salesperson) where.salesperson = req.query.salesperson;
    if (req.query.search) {
      const search = req.query.search;
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { company: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    const leads = await Lead.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, company, email, phone, source, salesperson, status, value } = req.body;
    const newLead = await Lead.create({
      name: name || 'Unknown',
      company: company || '',
      email: email || '',
      phone: phone || '',
      source: source || 'Website',
      salesperson: salesperson || '',
      status: status || 'New',
      value: Number(value) || 0
    });
    res.json(newLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const { name, company, email, phone, source, salesperson, status, value } = req.body;
    const [updated] = await Lead.update({
      name, company, email, phone, source, salesperson, status, value
    }, { where: { id: req.params.id } });
    
    if (updated) {
      res.json({ message: 'Lead updated successfully' });
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const deleted = await Lead.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Lead deleted successfully' });
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await Lead.update({ status }, { where: { id: req.params.id } });
    if (updated) {
      res.json({ message: 'Lead status updated successfully' });
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const exportLeadsCSV = async (req, res) => {
  try {
    const leads = await Lead.findAll({ raw: true });
    const { Parser } = require('json2csv');
    const parser = new Parser();
    const csvData = parser.parse(leads);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const importLeadsCSV = (req, res) => {
  const fs = require('fs');
  const csv = require('csv-parser');
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  const results = [];
  const errors = [];
  
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      fs.unlinkSync(req.file.path);
      
      if (results.length === 0) return res.json({ message: 'Import completed', successCount: 0 });
      
      let successCount = 0;
      
      try {
        for (const row of results) {
          await Lead.create({
            name: row.name || 'Unknown', 
            company: row.company || '', 
            email: row.email || '', 
            phone: row.phone || '', 
            source: row.source || 'Website', 
            salesperson: row.salesperson || '', 
            status: row.status || 'New', 
            value: parseFloat(row.value) || 0
          });
          successCount++;
        }
        
        res.json({ message: 'Import completed', successCount, errors });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
};

module.exports = { 
  getLeads, createLead, getLeadById, updateLead, deleteLead, updateLeadStatus, exportLeadsCSV, importLeadsCSV 
};

const { listLeads, getLeadById: getLead, createLead: insertLead, updateLead: modifyLead, deleteLead: removeLead } = require('../src/dataconnect-admin-generated');

const getLeads = async (req, res) => {
  try {
    const response = await listLeads();
    let leads = response.data.leads;
    
    // Memory filtering for search/status (as Data Connect GraphQL doesn't easily support dynamic where without defining multiple queries)
    if (req.query.status) {
      leads = leads.filter(l => l.status === req.query.status);
    }
    if (req.query.source) {
      leads = leads.filter(l => l.source === req.query.source);
    }
    if (req.query.salesperson) {
      leads = leads.filter(l => l.salesperson === req.query.salesperson);
    }
    if (req.query.search) {
      const searchLower = req.query.search.toLowerCase();
      leads = leads.filter(lead => 
        (lead.name && lead.name.toLowerCase().includes(searchLower)) ||
        (lead.company && lead.company.toLowerCase().includes(searchLower)) ||
        (lead.email && lead.email.toLowerCase().includes(searchLower))
      );
    }
    
    // Map camelCase back to snake_case for frontend compatibility if needed, but standard practice is returning as-is
    res.json(leads);
  } catch (error) {
    console.error("GET LEADS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const createLead = async (req, res) => {
  try {
    const { name, company, email, phone, source, salesperson, status, value } = req.body;
    
    const newLead = {
      name: name || 'Unknown', 
      company: company || '', 
      email: email || '', 
      phone: phone || '', 
      source: source || 'Website', 
      salesperson: salesperson || '', 
      status: status || 'New', 
      value: Number(value) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Remove any undefined properties explicitly just in case
    Object.keys(newLead).forEach(key => newLead[key] === undefined && delete newLead[key]);
    
    const response = await insertLead(newLead);
    res.json({ id: response.data.lead_insert.id, ...newLead });
  } catch (error) {
    console.error("CREATE LEAD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const response = await getLead({ id: req.params.id });
    if (!response.data.lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(response.data.lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const { name, company, email, phone, source, salesperson, status, value } = req.body;
    
    await modifyLead({
      id: req.params.id,
      name, company, email, phone, source, salesperson, status, value,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ message: 'Lead updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    await removeLead({ id: req.params.id });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const currentLead = await getLead({ id: req.params.id });
    if (!currentLead.data.lead) return res.status(404).json({ error: 'Lead not found' });
    
    // Omit fields that are not part of UpdateLeadVariables (e.g. createdAt, __typename)
    const { createdAt, __typename, ...leadUpdateData } = currentLead.data.lead;
    
    await modifyLead({
      ...leadUpdateData,
      status, 
      updatedAt: new Date().toISOString() 
    });
    
    res.json({ message: 'Lead status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const exportLeadsCSV = async (req, res) => {
  try {
    const response = await listLeads();
    const leads = response.data.leads;
    
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
          await insertLead({
            name: row.name || 'Unknown', 
            company: row.company || '', 
            email: row.email || '', 
            phone: row.phone || '', 
            source: row.source || 'Website', 
            salesperson: row.salesperson || '', 
            status: row.status || 'New', 
            value: parseFloat(row.value) || 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          successCount++;
        }
        
        res.json({ 
          message: 'Import completed', 
          successCount,
          errors 
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
};

module.exports = { 
  getLeads, createLead, getLeadById, updateLead, deleteLead, updateLeadStatus, exportLeadsCSV, importLeadsCSV 
};

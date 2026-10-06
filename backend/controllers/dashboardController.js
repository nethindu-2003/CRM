const { Lead } = require('../models');

const getDashboardMetrics = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    
    const metrics = {
      totalLeads: 0,
      newLeads: 0,
      qualifiedLeads: 0,
      wonLeads: 0,
      lostLeads: 0,
      totalValue: 0,
      wonValue: 0
    };

    leads.forEach((data) => {
      const status = data.status;
      const value = data.value || 0;

      metrics.totalLeads += 1;
      metrics.totalValue += value;

      if (status === 'New') metrics.newLeads += 1;
      if (status === 'Qualified') metrics.qualifiedLeads += 1;
      if (status === 'Won') {
        metrics.wonLeads += 1;
        metrics.wonValue += value;
      }
      if (status === 'Lost') metrics.lostLeads += 1;
    });

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboardMetrics };

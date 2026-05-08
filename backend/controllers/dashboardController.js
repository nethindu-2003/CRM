const db = require('../config/database');

const getDashboardMetrics = (req, res) => {
  const metrics = {};
  
  db.serialize(() => {
    db.get(`SELECT COUNT(*) as totalLeads FROM leads`, [], (err, row) => {
      metrics.totalLeads = row.totalLeads;
      
      db.get(`SELECT COUNT(*) as newLeads FROM leads WHERE status = 'New'`, [], (err, row) => {
        metrics.newLeads = row.newLeads;
        
        db.get(`SELECT COUNT(*) as qualifiedLeads FROM leads WHERE status = 'Qualified'`, [], (err, row) => {
          metrics.qualifiedLeads = row.qualifiedLeads;
          
          db.get(`SELECT COUNT(*) as wonLeads FROM leads WHERE status = 'Won'`, [], (err, row) => {
            metrics.wonLeads = row.wonLeads;
            
            db.get(`SELECT COUNT(*) as lostLeads FROM leads WHERE status = 'Lost'`, [], (err, row) => {
              metrics.lostLeads = row.lostLeads;
              
              db.get(`SELECT SUM(value) as totalValue FROM leads`, [], (err, row) => {
                metrics.totalValue = row.totalValue || 0;
                
                db.get(`SELECT SUM(value) as wonValue FROM leads WHERE status = 'Won'`, [], (err, row) => {
                  metrics.wonValue = row.wonValue || 0;
                  res.json(metrics);
                });
              });
            });
          });
        });
      });
    });
  });
};

module.exports = { getDashboardMetrics };

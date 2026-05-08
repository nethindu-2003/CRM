const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'config', 'crm.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
    process.exit(1);
  }
});

const sampleLeads = [
  { name: 'Alice Smith', company: 'TechCorp', email: 'alice@techcorp.com', phone: '555-0101', source: 'Website', salesperson: 'Mark L.', status: 'New', value: 15000 },
  { name: 'Bob Jones', company: 'Global Ind', email: 'bjones@global.com', phone: '555-0102', source: 'LinkedIn', salesperson: 'Ana S.', status: 'Contacted', value: 25000 },
  { name: 'Charlie Brown', company: 'Peanuts LLC', email: 'cbrown@peanuts.com', phone: '555-0103', source: 'Referral', salesperson: 'Tom K.', status: 'Qualified', value: 5000 },
  { name: 'Diana Prince', company: 'Themyscira', email: 'diana@themyscira.gov', phone: '555-0104', source: 'Event', salesperson: 'Mark L.', status: 'Proposal Sent', value: 55000 },
  { name: 'Evan Wright', company: 'Wright Ways', email: 'evan@wrightways.com', phone: '555-0105', source: 'Cold Email', salesperson: 'Ana S.', status: 'Won', value: 12000 },
  { name: 'Fiona Gallagher', company: 'Shameless Inc', email: 'fiona@shameless.com', phone: '555-0106', source: 'Website', salesperson: 'Tom K.', status: 'Lost', value: 8000 },
  { name: 'George Miller', company: 'Mad Max Fury', email: 'george@madmax.com', phone: '555-0107', source: 'Referral', salesperson: 'Mark L.', status: 'New', value: 30000 },
  { name: 'Hannah Abbott', company: 'Hogwarts', email: 'hannah@hogwarts.edu', phone: '555-0108', source: 'LinkedIn', salesperson: 'Ana S.', status: 'Contacted', value: 45000 },
  { name: 'Ian Malcolm', company: 'InGen', email: 'ian@ingen.com', phone: '555-0109', source: 'Event', salesperson: 'Tom K.', status: 'Qualified', value: 105000 },
  { name: 'Julia Roberts', company: 'Hollywood Stars', email: 'julia@stars.com', phone: '555-0110', source: 'Website', salesperson: 'Mark L.', status: 'Proposal Sent', value: 75000 },
  { name: 'Kevin Flynn', company: 'ENCOM', email: 'kevin@encom.com', phone: '555-0111', source: 'Cold Email', salesperson: 'Ana S.', status: 'Won', value: 200000 },
  { name: 'Laura Palmer', company: 'Twin Peaks', email: 'laura@twinpeaks.com', phone: '555-0112', source: 'Referral', salesperson: 'Tom K.', status: 'New', value: 18000 },
];

db.serialize(() => {
  console.log('Clearing existing leads and notes (except admin user)...');
  db.run('DELETE FROM notes');
  db.run('DELETE FROM leads');

  // We assume admin user has id = 1 since it's the first seeded user
  const adminUserId = 1;

  console.log('Inserting sample leads...');
  const insertLeadStmt = db.prepare(`
    INSERT INTO leads (name, company, email, phone, source, salesperson, status, value) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertNoteStmt = db.prepare(`
    INSERT INTO notes (lead_id, content, created_by) VALUES (?, ?, ?)
  `);

  sampleLeads.forEach((lead, index) => {
    insertLeadStmt.run([lead.name, lead.company, lead.email, lead.phone, lead.source, lead.salesperson, lead.status, lead.value], function(err) {
      if (err) {
        console.error('Failed to insert lead', err);
        return;
      }
      const leadId = this.lastID;
      
      // Add some dummy notes to every other lead
      if (index % 2 === 0) {
        insertNoteStmt.run([leadId, `Initial contact established with ${lead.name}. Seemed interested in our premium tier.`, adminUserId]);
        insertNoteStmt.run([leadId, `Followed up with a calendar link to schedule a demo. Waiting for a reply.`, adminUserId]);
      }
    });
  });

  console.log('Sample data successfully seeded (wait a few moments for completion).');
});

// We'll just let the process exit cleanly after event loop completes


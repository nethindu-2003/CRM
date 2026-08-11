require('./config/firebase');
const { listLeads, createLead } = require('./src/dataconnect-admin-generated');

async function test() {
  try {
    const newLead = {
      name: 'Test Lead', 
      company: 'Test Company', 
      email: 'test@example.com', 
      phone: '1234567890', 
      source: 'Website', 
      salesperson: 'Test Person', 
      status: 'New', 
      value: 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const res = await createLead(newLead);
    console.log(res);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
test();

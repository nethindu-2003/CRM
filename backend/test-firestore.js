const { db } = require('./config/firebase');

async function test() {
  try {
    const newLead = {
      name: "Test",
      company: "",
      email: "",
      phone: "",
      source: "Website",
      salesperson: "",
      status: "New",
      value: "0",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const docRef = await db.collection('leads').add(newLead);
    console.log("Success:", docRef.id);
  } catch (err) {
    console.error("Firestore Error:", err.message);
  }
}

test();

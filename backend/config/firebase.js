const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

let db;
let auth;

try {
  const serviceAccount = require('./serviceAccountKey.json');
  const app = initializeApp({
    credential: cert(serviceAccount)
  });
  console.log('Firebase Admin initialized successfully');
  
  db = getFirestore(app);
  auth = getAuth(app);
} catch (error) {
  console.error('Error initializing Firebase Admin:', error.message);
  console.warn('Please ensure serviceAccountKey.json is placed in backend/config/');
}

module.exports = { db, auth };

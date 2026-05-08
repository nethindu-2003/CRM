const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { 
  getLeads, createLead, getLeadById, updateLead, deleteLead, 
  updateLeadStatus, exportLeadsCSV, importLeadsCSV 
} = require('../controllers/leadController');
const { getNotesByLead, createNote } = require('../controllers/noteController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middleware/validationMiddleware');

// Ensure uploads dir exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
const upload = multer({ dest: 'uploads/' });

// Validation rules
const leadValidationRules = [
  body('name').notEmpty().withMessage('Lead name is required'),
  body('email').optional({ checkFalsy: true }).isEmail().withMessage('Must be a valid email'),
  body('phone').optional({ checkFalsy: true }).matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),
  body('value').optional({ checkFalsy: true }).isFloat({ min: 0 }).withMessage('Deal value must be a positive number'),
  body('status').optional().isIn(['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost']).withMessage('Invalid status'),
];

const noteValidationRules = [
  body('content').notEmpty().withMessage('Note content cannot be empty'),
];

// CSV Routes
router.get('/export', authenticateToken, exportLeadsCSV);
router.post('/import', authenticateToken, upload.single('file'), importLeadsCSV);

// Lead CRUD
router.get('/', authenticateToken, getLeads);
router.post('/', authenticateToken, leadValidationRules, validate, createLead);
router.get('/:id', authenticateToken, getLeadById);
router.put('/:id', authenticateToken, leadValidationRules, validate, updateLead);
router.delete('/:id', authenticateToken, deleteLead);

// Notes
router.get('/:id/notes', authenticateToken, getNotesByLead);
router.post('/:id/notes', authenticateToken, noteValidationRules, validate, createNote);

module.exports = router;

const express = require('express');

const router = express.Router();

const reflectionController = require('../controllers/reflectionController');
const authMiddleware = require('../../middleware/authMiddleware');

// ======================================
// CREATE REFLECTION
// ======================================

router.post(
  '/',
  authMiddleware,
  reflectionController.createReflection
);

// ======================================
// GET USER REFLECTIONS
// ======================================

router.get(
  '/',
  authMiddleware,
  reflectionController.getReflections
);

module.exports = router;
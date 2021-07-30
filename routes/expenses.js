const router = express.Router();
import express from 'express'
import auth from '../middleware/auth.js';
import Admin from '../middleware/admin.js';
import { addExpense, getExpenses, updateExpense, deleteExpense, getExp } from '../controllers/expensesController.js'

router.post('/', addExpense)
router.get('/', getExpenses)
router.get('/forchart', getExp)
router.put('/:id', updateExpense)
router.delete('/:id', deleteExpense)

export default router;
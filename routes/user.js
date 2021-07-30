const router = express.Router();
import express from 'express'
import auth from '../middleware/auth.js';
import Admin from '../middleware/admin.js';
import { authUser, deleteUser, getUserProfile, getUsers, registerUser, updateUserProfile } from '../controllers/userController.js'

router.post('/', registerUser)
router.post('/login', authUser)
router.get('/:id', getUserProfile)
router.put('/:id', updateUserProfile)
router.delete('/:id', deleteUser)
router.get('/', getUsers)

export default router;
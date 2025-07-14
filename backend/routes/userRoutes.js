import express from 'express';
import {
  addUser,
  getUsers,
  claimPoints,
  getLeaderboard,
  getHistory
} from '../controller/userController.js';

const router = express.Router();

router.post('/users', addUser);
router.get('/users', getUsers);
router.post('/claim', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history', getHistory);

export default router;

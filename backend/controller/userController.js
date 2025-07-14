import User from '../model/user.js';
import History from '../model/History.js';

// Add a new user
export const addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.create({ name });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Claim random points
export const claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1; // 1 to 10
    user.totalPoints += points;
    await user.save();

    await History.create({
      userId,
      userName: user.name,
      pointsAwarded: points
    });

    res.json({ message: `${points} points awarded to ${user.name}`, points });
  } catch (error) {
    res.status(500).json({ error: 'Failed to claim points' });
  }
};

// Get leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const rankedUsers = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.totalPoints
    }));

    res.json(rankedUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get leaderboard' });
  }
};

// Get claim history
export const getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

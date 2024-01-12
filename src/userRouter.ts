import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import validate from 'uuid-validate';
import { Users } from './types';
import validateUserInput from './utils';

const router = Router();
const users: Users = [];

router.get('/', (req, res) => {
  res.status(200).json(users);
});

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!validate(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
});

router.post('/', (req, res) => {
  const { username, age, hobbies } = req.body;

  if (!validateUserInput(req.body)) {
    return res.status(400).json({ message: 'Invalid userId format or user data' });
  }
  const newUser = { id: uuidv4(), username, age, hobbies: hobbies || [] };
  users.push(newUser);

  res.status(201).json(newUser);
});

router.put('/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!validate(userId) || !validateUserInput(req.body)) {
    return res.status(400).json({ message: 'Invalid userId format or user data' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { username, age, hobbies } = req.body;

  users[userIndex] = { ...users[userIndex], username, age, hobbies: hobbies || [] };

  res.status(200).json(users[userIndex]);
});

router.delete('/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!validate(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }

  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);

  res.status(204).send();
});

export default router;

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Queue } from 'bullmq';
import { logger } from '../../../../src/utils/logger';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

const emailQueue = new Queue('emails', {
  connection: { host: 'localhost', port: 6379 },
});

export const authController = {
  // Signup
  async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Email and password are required!' });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email, password: hashed },
      });

      // Ensure welcome email
      await emailQueue.add('welcomeEmail', {
        to: email,
        subject: 'Welcome abroad',
        text: 'Thanks for signing up!',
      });

      res.json({ message: 'User created', userId: user.id });
    } catch (error: any) {
      if (error.code === 'P2002') {
        //Prisma unique constraint violation
        return res.status(409).json({ error: 'User already exists' });
      }
      logger.info('Signup error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Login
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: 'Email and password are required' });
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      res.json({ token });
    } catch (error) {
      logger.info('Login error: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

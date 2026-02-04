import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userIdHeader = req.headers['x-user-id'];

  if (!userIdHeader) {
    return res.status(401).json({ message: 'Unauthorized: No user ID provided' });
  }

  const userId = parseInt(userIdHeader as string, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  req.userId = userId;
  next();
};


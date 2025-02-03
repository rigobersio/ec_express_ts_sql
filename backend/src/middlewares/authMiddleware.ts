import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Por ahora, aprueba todas las solicitudes
  next();
};

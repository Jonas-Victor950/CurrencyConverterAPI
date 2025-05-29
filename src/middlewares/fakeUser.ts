import { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: number };
  }
}

export function fakeUser(req: Request, res: Response, next: NextFunction) {
  req.user = { id: 123 };
  next();
}

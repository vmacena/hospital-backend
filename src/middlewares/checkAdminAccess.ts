import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: any;
}

const checkAdminAccess = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.accessLevel === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

export { checkAdminAccess };
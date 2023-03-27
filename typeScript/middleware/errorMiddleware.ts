import { NextFunction, Request, Response } from "express";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(400).send({ message: err.message });
  }

export default errorMiddleware
import { NextFunction, Request, Response } from "express";

const handler = (cb: CallableFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res);
    } catch (err) {
      next(err);
    }
  };
};

export default handler;

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IJwtParsedValue {
  roles: Array<string>;
  id: string;
}

export default (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
      return next();
    }
    try {
      if (
        typeof req.headers.authorization !== "string" ||
        req.headers.authorization === ""
      ) {
        return res.status(401).json({ message: "chka senc polzvtel" });
      }
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "chka senc polzvtel" });
      }

      const { roles: userRole }: JwtPayload = jwt.verify(
        token,
        process.env.SECRET!
      ) as JwtPayload & IJwtParsedValue;
      let hasRole = false;

      userRole.forEach((role: string) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return next({ message: "DUQ CHuNEQ DOSTUP", status: 500 });
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};

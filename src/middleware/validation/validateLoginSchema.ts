import { Request, Response, NextFunction, RequestHandler } from "express";
import { login_schema } from "../../schema/loginSchema";
import { validationResult, checkSchema } from "express-validator";

export const validateLoginSchema: RequestHandler[] = [
  // ...checkSchema(login_schema),
  (req: Request, res: Response, next: NextFunction) =>
    checkSchema(login_schema)
      .run(req)
      .then(() => next())
      .catch(next),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      res.status(400).json({ message: errorMessages });
      return;
    }
    next();
  },
];

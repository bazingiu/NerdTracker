import { Request, Response, NextFunction } from "express";
import { ValidateFunction } from "ajv";

/**
 * Middleware to validate the request body using an AJV schema.
 * @param validate - AJV validation function.
 */
export const validateRequest = (validate: ValidateFunction) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!validate(req.body)) {
      res.status(400).json({ errors: validate.errors ?? "Invalid request body" });
      return; // Explicitly return to avoid proceeding to `next()`
    }
    next(); // Proceed to the next middleware if validation passes
  };
};

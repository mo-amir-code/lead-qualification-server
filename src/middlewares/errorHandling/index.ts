/**
 * errorHandling/index.ts
 * -----------------------------------------------------
 * Centralized error handling utilities:
 * - Custom ErrorHandlerClass for consistent error objects
 * - errorHandler middleware to format error responses
 * - apiHandler wrapper for async route handlers
 * - ok() utility for consistent success responses
 */

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import {
  APIHandlerType,
  APISuccessType,
} from "../../types/services/errorHandling/index.js";

/**
 * Custom Error Class
 * -----------------------------------------------------
 * Extends the built-in Error object to include an HTTP status code.
 * Usage: throw new ErrorHandlerClass("Not Found", 404)
 */
class ErrorHandlerClass extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Global Error Handler Middleware
 * -----------------------------------------------------
 * Catches errors thrown in the app and returns a JSON response.
 * - Defaults to status 500 and "Internal Server Error" if not set.
 * - Ensures consistent error structure: { success: false, message }
 */
const errorHandler: ErrorRequestHandler = async (
  err: ErrorHandlerClass,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  res.status(err.statusCode).json({
    success: false,
    message: err?.message,
  });
};

/**
 * API Handler Wrapper
 * -----------------------------------------------------
 * Utility to wrap async route handlers.
 * - Eliminates repetitive try/catch in routes.
 * - Passes errors to global error handler if a promise rejects.
 *
 * Example:
 * router.post("/offer", apiHandler(async (req, res) => {
 *   // business logic
 * }));
 */
const apiHandler =
  (func: APIHandlerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch((err) => {
      console.error(err);
      next(err); // Forward error to errorHandler
    });
  };

/**
 * Success Response Utility
 * -----------------------------------------------------
 * Sends a standardized success JSON response.
 * - Default status: 200
 * - Format: { success: true, message, data }
 *
 * Example:
 * return ok({ res, message: "Offer created", data: offer });
 */
const ok = ({ res, statusCode = 200, message, data }: APISuccessType) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export { ErrorHandlerClass, errorHandler, apiHandler, ok };

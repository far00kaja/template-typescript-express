import Logger from "../config/logger";
import { NextFunction, Request, Response } from "express";

interface LoggerRequest {
  password: string;
  confirmPassword: string;
};

const writeLogger = (req: Request, res: Response, next: NextFunction) => {
  let databodye = JSON.stringify(req.body);
  let databody: LoggerRequest = JSON.parse(databodye);
  if (databody.password) {
    databody.password = "x x x x x";
    databody.confirmPassword = "x x x x x";
  }
  const dataLog = JSON.stringify({
    requestDate: new Date().getTime(),
    host: req.headers.host,
    authorization: req.headers.authorization,
    acceptLanguage: req.headers["accept-language"],
    method: req.method,
    body: databody,
  });
  Logger.info(dataLog);
  next();
};

export default writeLogger;

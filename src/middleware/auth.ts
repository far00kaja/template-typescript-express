import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import response from "../utils/response";
import redis from "../config/redis";
import logger from "../config/logger";

export default async (req: Request, res: Response, next: NextFunction) => {

  let token = req.get("Authorization");

  if (!token) {
    return response(res, 401, "Not Authenticated", null, null);
  }

  if (token.includes("Bearer")) {
    let bearerToken = token.split(" ");
    // logger.info(bearerToken);
    if (bearerToken.length < 2)
      return response(res, 401, "Not Authenticated", null, null);
    if (bearerToken[0] !== "Bearer")
      return response(res, 401, "Not Authenticated", null, null);

    bearerToken[1] = bearerToken[1].replace(" ", "");
    token = bearerToken[1];
  }
  //  else {
  //   return response(res, 401, "Not Authenticated", null);
  // }

  const isExist = await redis.exists(token);
  // logger.info('exist : ', isExist);
  if (isExist !== 1) return response(res, 401, "Not Authenticated", null, null);

  let checkRedis = await redis.get(token);
  // // logger.info('token baru:', token);

  redis.on("error", (err: Error) => logger.info("Redis Client Error", err));

  let decToken;
  let jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : ''
  try {
    decToken = jwt.verify(token, jwtKey, {
      algorithms: ["HS256"],
      complete: true,
    });
    // logger.info("decToken : ", decToken);
  } catch (error: any) {
    logger.info("error : ", error);
    // return response(res, 401, "Not Authenticated", null);
    if (error.message === "jwt expired")
      return response(res, 401, "Token Expired", null, null);
    return response(res, 500, error.message, null, null);
  }

  if (!decToken) {
    return response(res, 401, "Not Authenticated", null, null);
  }
  // req.user = decToken;

  next();
};

"use stricts";
import jwt from "jsonwebtoken";
import { findFirstByUsername, save } from "./repositories";
import bcrypt from "../../config/bcrypt";
import redisClient from "../../config/redis";
// const redis = require("redis");
import logger from "../../config/logger";
import { Request } from "express";

interface RegisterRequest {
  username: string,
  password: string,
  name: string
}

interface LoginRequest {
  username: string,
  password: string
}

const registerAuths = async (request: RegisterRequest) => {
  try {
    const { username, password, name } = request;
    const isExist = await findFirstByUsername(username);
    if (isExist) {
      throw new Error("username already exists");
    }

    const hash = bcrypt.hashPassword(password);
    const data = {
      username: username,
      password: hash,
      name: name,
    };

    const create = await save(data);
    return create;
  } catch (error) {
    throw error;
  }
};
const loginAuths = async (request: LoginRequest) => {
  try {
    const { username, password } = request;
    const isExist = await findFirstByUsername(username);
    if (!isExist) {
      throw new Error("username or password invalid");
    }

    const newPassword = bcrypt.matchPassword(password, isExist.password);
    const jwtKey: any = process.env.JWT_KEY ? process.env.JWT_KEY : '';
    const token = jwt.sign(
      {
        data: {
          username: username,
          name: isExist.name,
        },
      },
      jwtKey,
      {
        expiresIn: '2 days',
      });
    // let token = jwt.sign(
    //   {
    //     data: {
    //       username: username,
    //       name: isExist.name,
    //     },
    //   },
    //   jwtKey,
    //   {
    //     algorithm: ["HS256"],
    //     expiresIn: "1h",
    //   }
    // );

    if (newPassword) {
      const data = JSON.stringify({
        username: username,
        name: isExist.name,
        token: token,
      });
      jwt.verify(
        token, jwtKey,
        {
          algorithms: ["HS256"],
        },
        function (err, decoded) {
          logger.info("err:", err);
          logger.info("token:", decoded);
        }
      );

      //set redis
      await redisClient.set(token, JSON.stringify(data), {
        EX: 60 * 60,
        NX: true,
      });
      return JSON.parse(data);
    }
    throw new Error("username or password invalid");
  } catch (error) {
    throw error;
  }
};

const verifyAuths = async (request: any) => {
  try {
    const token = request.split(" ")[1];
    logger.info(token);
    const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : '';
    const decToken = jwt.verify(token, jwtKey, {
      algorithms: ["HS256"],
    });

    // const check = await redisClient.get(token);
    // if (check){
    //   await redisClient.del(token);
    // }
    // await redisClient.set(token, check, {
    //   EX: 60*60,
    //   NX: true,
    // });
    return decToken;
  } catch (error) {
    throw error;
  }
};
export { registerAuths, loginAuths, verifyAuths };

"use stricts";

import { validationResult } from "express-validator";
import { registerAuths, loginAuths, verifyAuths } from "./service";
import response from "../../utils/response";
import logger from "../../config/logger";

const register = async (request: any, response: any) => {
  try {
    await validationResult(request).throw();
    await registerAuths(request.body);
    response.send({
      status: true,
      message: "success registered",
    });
  } catch (error: any) {
    logger.info("error con:", error);
    response.status(400).send({
      status: false,
      message: error.errors ? error.errors[0].msg : error.message,
    });
  }
};

const login = async (request: any, response: any) => {
  try {
    await validationResult(request).throw();
    const result = await loginAuths(request.body);
    response.send({
      status: true,
      message: "success",
      data: result,
    });
  } catch (error: any) {
    logger.info("error con:", error);
    response.status(400).send({
      status: false,
      message: error.errors ? error.errors[0].msg : error.message,
    });
  }
};

const verify = async (request: any, res: any) => {
  try {
    const result = await verifyAuths(request.get("Authorization"));
    logger.info(result);
    response(
      res,
      200,
      "success",
      null,
      {
        status: true,
        message: result,
      },
    )

    // response.send({
    //   status: true,
    //   message: result,
    // });
  } catch (error: any) {
    logger.info("error con:", error);
    response(res, 400, error.errors ? error.errors[0].msg : error.message, null, null)
    // response.status(400).send({
    //   status: false,
    //   message: error.errors ? error.errors[0].msg : error.message,
    // });
  }
};

export {
  register,
  login,
  verify,
};

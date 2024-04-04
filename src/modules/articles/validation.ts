import { checkSchema } from "express-validator"
import logger from "../../config/logger";
import { NextFunction, Request, Response } from "express";

const valPostArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await checkSchema({
      title: {
        isLength: {
          options: { min: 8, max: 50 },
          errorMessage: "title must be 8-50 character",
        },
      },
      description: {
        isLength: {
          options: { min: 10 },
          errorMessage: "description should be min 10, max 100 characters",
        },
        notEmpty: {
          errorMessage: "description can not be null",
        },
      },
    }).run(req);
    next();
  } catch (error) {
    logger.info("err", error);
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  valPostArticle,
};

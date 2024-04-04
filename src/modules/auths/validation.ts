import { checkSchema } from "express-validator"
import logger from "../../config/logger";
import { NextFunction, Request, Response } from "express";

const valRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await checkSchema({
      username: {
        isLength: {
          options: { min: 8, max: 20 },
          errorMessage:
            "username must be 8-20 character, alphanumeric and not contains space",
        },
        matches: {
          options: /\s/,
          negated: true,
          errorMessage:
            "username must be 8-20 character, alphanumeric and not contains space",
        },

        // }
        isAlphanumeric: {
          errorMessage:
            "username must be 8-20 character, alphanumeric and not contains space",
        },
      },
      name: {
        isLength: {
          options: { min: 3, max: 100 },
          errorMessage: "name should be min 3, max 100 characters",
        },
        notEmpty: {
          errorMessage: "name can not be null",
        },
      },
      password: {
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
          },
          errorMessage:
            "password must contains, min 8 character, 1 lower case, 1 upper case, 1 number and 1 symbol",
        },
      },
      confirmPassword: {
        errorMessage: "password not equals",
        equals: { options: [req.body.password] },
        trim: true,
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
const valLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await checkSchema({
      username: {
        isLength: {
          options: { min: 8, max: 20 },
          errorMessage:
            "username must be 8-20 character, alphanumeric and not contains space",
        },
        matches: {
          options: /\s/,
          negated: true,
          errorMessage:
            "username must be 8-20 character, alphanumeric and not contains space",
        },

        // }
        isAlphanumeric: {
          errorMessage:
            "username must be 8-20 character, alphanumeric and not contains space",
        },
      },
      password: {
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
          },
          errorMessage:
            "password must contains, min 8 character, 1 lower case, 1 upper case, 1 number and 1 symbol",
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

export {
  valRegister,
  valLogin,
};

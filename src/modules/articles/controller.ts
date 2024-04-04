"use stricts";

import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { saveArticle, getArticle } from "./service";
import response from "../../utils/response";

const save = async (request: Request, res: Response) => {
  try {
    await validationResult(request).throw();
    await saveArticle(request);
    response(res, 200, "success published articles", null, null);
  } catch (error: any) {
    response(
      res,
      400,
      error.errors ? error.errors[0].msg : error.message,
      null, null
    );
  }
};
const getData = async (request: Request, res: Response) => {
  try {
    // await validationResult(request).throw();
    const data = await getArticle(request);
    response(res, 200, "success show articles", null, data);
  } catch (error: any) {
    response(
      res,
      400,
      error.errors ? error.errors[0].msg : error.message,
      null, null
    );
  }
};

module.exports = {
  save,
  getData,
};

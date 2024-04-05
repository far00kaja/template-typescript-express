"use stricts";

import { Request } from "express";

import { findFirstByUsername, findByUsername } from "../../modules/auths/repositories";
import Model from "./models";
import jwt, { JwtPayload } from "jsonwebtoken";
// const rsmq = require("../../config/rsmq");
// const { findFirstByUsername, findByUsername } = repositories;
interface IToken extends JwtPayload {
  data: IJWTData
}
interface IJWTData {
  username: string
}
declare module "jsonwebtoken" {
  export interface JwtPayload {
    data: IJWTData;
  }
}


const saveArticle = async (request: Request) => {
  try {
    const { title, description } = request.body;
    let authorization = request.headers.authorization ? request.headers.authorization : ''
    const auth = authorization.split(" ")[1];
    const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : '';
    const decToken: any = await jwt.verify(auth, jwtKey, {
      algorithms: ["HS256"],
    });
    const authors = decToken.data.username;
    const isExist = await findByUsername(authors);
    if (!isExist) {
      throw new Error("authors not found");
    }
    const data = new Model({
      authors: isExist.id,
      description: description,
      title: title,
      slug: title.split(" ").join("-"),
    });
    try {
      const dataToSave = await data.save();
      // await rsmq.sendMessage("getArticle", dataToSave);
      return dataToSave;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const getArticle = async (request: Request) => {
  try {
    let authorization = request.headers.authorization ? request.headers.authorization : ''
    const auth = authorization.split(" ")[1]

    const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : '';
    const decToken: any = await jwt.verify(auth, jwtKey, {
      algorithms: ["HS256"],
    });

    const authors = decToken.data.username;
    const isExist = await findByUsername(authors);
    if (!isExist) {
      throw new Error("authors not found");
    }
    // await rsmq.getQueueAttributes("getArticle");
    // if (!getAll) {
    //   await rsmq.createQueue("getArticle");
    // }
    const data = await Model.find(
      {
        authors: isExist.id,
      },
      {},
      {
        sort: { createdAt: -1 },
      }
    );

    let result = {
      authors: isExist,
      articles: data,
    };

    try {
      return result;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const getArticleGraphQL = async (request: string) => {
  try {
    console.log('request')
    console.log(request)
    // let authorization = request.headers.authorization ? request.headers.authorization : ''
    // let authorization = request.headers.authorization ? request.headers.authorization : ''
    const auth = request.split(" ")[1]

    const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : '';
    const decToken: any = await jwt.verify(auth, jwtKey, {
      algorithms: ["HS256"],
    });

    const authors = decToken.data.username;
    const isExist = await findByUsername(authors);
    if (!isExist) {
      throw new Error("authors not found");
    }
    // await rsmq.getQueueAttributes("getArticle");
    // if (!getAll) {
    //   await rsmq.createQueue("getArticle");
    // }
    const data = await Model.find(
      {
        authors: isExist.id,
      },
      {},
      {
        sort: { createdAt: -1 }, 
      }
    );

    let result = {
      authors: isExist,
      articles: data,
    };

    try {
      // return data[0];
      // return data;
      return result;

      // return isExist;
    } catch (error) {
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

// module.exports =
// { saveArticle, getArticle, getArticleGraphQL };
export default {
  saveArticle, getArticle, getArticleGraphQL
};
export {
  saveArticle, getArticle
}


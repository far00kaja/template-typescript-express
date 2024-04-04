"use stricts";

import db from '../../config/sequelize'
const { auths } = db;



const findFirstByUsername = async (username: string) => {
  const result = await auths.findOne({
    where: { username: username },
    // attributes: ["username", "id"],
  });
  return result;
};

const findByUsername = async (username: string) => {
  const result = await auths.findOne({
    where: { username: username },
    attributes: ["username", "id"],
  });
  return result;
};

const save = async (request: any) => {
  try {
    const result = auths.create(request);
    return result;
  } catch (error: any) {
    throw new error();
  }
};


export  {
  findFirstByUsername,
  save,
  findByUsername
};

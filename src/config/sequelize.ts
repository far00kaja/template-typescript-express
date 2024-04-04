import dotenv from "dotenv"
dotenv.config();

import logger from "./logger";
import { Sequelize } from "sequelize";
import auths from '../modules/auths/models'

const sequelize = new Sequelize(
  process.env.DB_NAME ? process.env.DB_NAME : '',
  process.env.DB_USER ? process.env.DB_USER : '',
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
  {
    host: process.env.DB_HOST ? process.env.DB_HOST : '',
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// const sequelize = new Sequelize(process.env.DATABASE_URL); // Example for postgres

// const db = {};

async function open() {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");

    // db.auths = require("../modules/auths/models")(sequelize, Sequelize);
    // Sync models with the database
    sequelize
      .sync({ force: false }) // WARNING: This will drop existing tables and recreate them
      .then(() => {
        logger.info("Models synchronized with database.");
      })
      .catch((error: Error) => {
        logger.error("Error synchronizing models:", error);
      });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
}
open();

// define semua models yang ada pada aplikasi
// import auths
db.auths = auths(sequelize, Sequelize);
export default db;

// async function main() {
//   const getCompany = await prisma.company.findFirst({
//     where: {
//       name: "TEST ARVIS",
//     },
//   });

//   if (!getCompany) {
//     await prisma.company.create({
//       data: {
//         name: "TEST ARVIS",
//         status: true,
//       },
//     });
//     logger.info('succeed created seed')
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

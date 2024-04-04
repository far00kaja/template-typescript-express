const { DataTypes } = require("sequelize");

export default (sequelize: any, Sequelize: any) => {
  const auths = sequelize.define(
    "auths",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      username: { type: Sequelize.STRING(20), allowNull: false },
      name: { type: Sequelize.STRING(100), allowNull: false },
      password: { type: Sequelize.STRING(), allowNull: false },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ["password"] },
        },
      },
    }
  );
  return auths;
};

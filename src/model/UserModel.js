const { INTEGER, STRING } = require("sequelize");

const { sequelizeConnection } = require("../helper/SqlUtil");

// User Model Definition
const UserModel = sequelizeConnection.define(
  "User",
  {
    userId: {
      type: INTEGER,
      field: "Userd",
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      field: "Name",
    },
    email: {
      type: STRING,
      field: "Email",
    },
    roleCode: {
        type: STRING,
        field: "RoleCode",
      },
  },
  {
    tableName: "Tbl_User",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = UserModel;

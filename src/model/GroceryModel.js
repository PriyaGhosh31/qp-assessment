const { INTEGER, STRING } = require("sequelize");

const { sequelizeConnection } = require("../helper/SqlUtil");

// Grocery Model Definition
const GroceryModel = sequelizeConnection.define(
  "Grocery",
  {
    groceryItemId: {
      type: INTEGER,
      field: "GroceryItemId",
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    itemName: {
      type: STRING,
      field: "GroceryItemName",
    },
    price: {
      type: STRING,
      field: "Price",
    },
    quantity: {
      type: INTEGER,
      field: "Quantity",
    },
  },
  {
    tableName: "Tbl_Grocery",
    freezeTableName: true,
    timestamps: true,
  }
);
module.exports = { GroceryModel };

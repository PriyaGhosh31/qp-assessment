const { INTEGER } = require("sequelize");
const { GroceryModel } = require("./GroceryModel");

const { sequelizeConnection } = require("../helper/SqlUtil");

// Order Model Definition
const OrderModel = sequelizeConnection.define(
  "Order",
  {
    orderId: {
      type: INTEGER,
      field: "OrderId",
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    groceryId: {
      type: INTEGER,
      field: "GroceryId",
    },
    customerId: {
      type: INTEGER,
      field: "customerId",
    },
    orderQuantity: {
      type: INTEGER,
      field: "OrderQuantity",
    },
  },
  {
    tableName: "Tbl_Order",
    freezeTableName: true,
    timestamps: true,
  }
);

OrderModel.hasMany(GroceryModel);

module.exports =  { OrderModel };

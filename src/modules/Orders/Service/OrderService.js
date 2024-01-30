const { OrderModel } = require("../../../model/OrderModel");

// Creates Multiple Orders of Grocery by Customers
const saveOrderDetails = (payload, user) => {
  let data = [];
  payload.map((ele) => {
    data.push({
      groceryId: ele.groceryItemId,
      customerId: user.userId,
      orderQuantity: ele.orderQuantity,
    });
  });
  return OrderModel.createMany(data);
};

module.exports = saveOrderDetails;

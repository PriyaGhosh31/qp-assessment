const GroceryModel = require("../../../model/GroceryModel");
const ErrorResponse = require("../../../helper/Response");

// Save Grocery details
const saveGroceryDetails = (payload, options) => {
  return GroceryModel.create(payload, options);
};

// Get Grocery Details from DB
const getGroceryDetailsOnId = (options) => {
  return GroceryModel.get(options);
};

// Updates Grocery details based on Condition
const updateGroceryData = (payload, options) => {
  return GroceryModel.update(payload, options);
};

// Deletes Grocery Data based on Grocery Id
const deleteGroceryData = (payload, options) => {
  return GroceryModel.delete(payload, options);
};

// Get All Available Grocery Data
const getAllGroceryData = async (payload, options) => {
  const groceryData = await GroceryModel.findAndCountAll({
    where: { quantity: { [Op.gt]: 0 } },
    limit: request.params?.limit,
    offset: request.params?.offset,
  });
  return {
    data: groceryData.rows,
    paginatedData: {
      limit: request.params?.limit,
      offset: request.params?.offset,
      count: groceryData.count,
    },
  };
};

// Updates Order Details by Customers
const updateInventoryDetails = async (details, groceryId) => {
  const groceryDetails = await getGroceryDetailsOnId({
    groceryItemId: groceryId,
  });

  if (!groceryDetails)
    throw new ErrorResponse(
      "Invalid Grocery Item Id!",
      "Validation Error",
      400
    );
  let options = {
    groceryItemName: details.groceryItemName,
    price: details?.price ? details?.price : groceryDetails.price,
  };
  let quantity;
  switch (details) {
    case "add_item":
      quantity = groceryDetails.quantity + details.quantity;
      options.quantity = quantity;
      break;
    case "remove_item":
      if (groceryDetails.quantity < details.quantity)
        throw new ErrorResponse(
          "Cannot Remove Grocery Item , Inventory Quantity is not sufficient!"
        );
      else {
        quantity = groceryDetails.quantity + details.quantity;
        options.quantity = quantity;
      }
      break;
    default:
      break;
  }
  return await updateGroceryData(options, {
    where: { groceryItemId: groceryId },
  });
};

module.exports = {
  saveGroceryDetails,
  getGroceryDetailsOnId,
  updateGroceryData,
  deleteGroceryData,
  getAllGroceryData,
  updateInventoryDetails,
};

const { param, body } = require("express-validator");
const { ErrorResponse } = require("../../../helper/Response");

// Validates Request data Before hitting the database while patching the data
const updateDetailsValidator = function () {
  return [
    param("id").exists().withMessage("Grocery Id is Required"),
    body("price").optional(),
    body("groceryItemName").optional(),
    body("quantity").optional(),
    body("add_item")
      .optional()
      .isBoolean()
      .toBoolean()
      .custom((val) => {
        if (val) {
          if (!request.body.quantity)
            throw new ErrorResponse(
              "Quantity is required to Add Item to Inventory!"
            );
        }
      }),
    body("remove_item")
      .optional()
      .isBoolean()
      .toBoolean()
      .custom((val) => {
        if (val) {
          if (!request.body.quantity)
            throw new ErrorResponse(
              "Quantity is required to Remove Item from Inventory!"
            );
        }
      }),
  ];
};

// Validates Request data Before hitting the database while Saving grocery data
const saveDetailsValidator = function () {
  return [
    body("groceryItemName")
      .exists()
      .withMessage("Grocery Item Name is Required"),
    body("price").exists().withMessage("Grocery Item Price is Required"),
    body("quantity").exists().withMessage("Grocery Item quantity is Required"),
  ];
};
// Validates Request data Before hitting the database while saving order data
const saveOrderDetailsValidator = function () {
  return [
    body("orderItems")
      .exists()
      .withMessage("Order Items is Required")
      .isArray()
      .withMessage("Order Items must be an Array!"),
    body("orderItems.*.groceryId")
      .exists()
      .withMessage("Grocery Id is Required"),
    body("orderItems.*.orderQuantity")
      .exists()
      .withMessage("Grocery Item quantity is Required"),
  ];
};

module.exports = {
  updateDetailsValidator,
  saveDetailsValidator,
  saveOrderDetailsValidator,
};

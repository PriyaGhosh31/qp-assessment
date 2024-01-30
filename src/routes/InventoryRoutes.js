const express = require("express");
const InventoryController = require("../modules/Inventory/Controller/InventoryController");
const {
  updateDetailsValidator,
  saveDetailsValidator,
  saveOrderDetailsValidator,
} = require("../modules/Inventory/Validators/InventoryValidator");
const { isAuthorized } = require("../helper/Auth");
console.log("Hi");
const inventoryRoutes = express.Router();

// Add new grocery items to the system
inventoryRoutes.post(
  "/add-grocery",
  isAuthorized,
  saveDetailsValidator(),
  InventoryController.saveGroceryDetails
);

// View existing grocery items
inventoryRoutes.get(
  "/view-grocery/:id",
  isAuthorized,
  updateDetailsValidator(),
  InventoryController.getGroceryDetails
);

// Remove grocery items from the system
inventoryRoutes.delete(
  "/delete-grocery/:id",
  isAuthorized,
  updateDetailsValidator(),
  InventoryController.deleteGroceryDetails
);

// Update details (e.g., name, price) of existing grocery items
//Manage inventory levels of grocery items
inventoryRoutes.patch(
  "/update-grocery/:id",
  isAuthorized,
  updateDetailsValidator(),
  InventoryController.updateGroceryDetails
);

//View the list of available grocery items
inventoryRoutes.get(
  "/view-grocery/paginated",
  isAuthorized,
  InventoryController.getAllGroceryDetails
);

// Ability to book multiple grocery items in a single order
inventoryRoutes.post(
  "/create-order",
  isAuthorized,
  saveOrderDetailsValidator(),
  InventoryController.createOrder
);

module.exports = inventoryRoutes;

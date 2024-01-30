const { validationResult } = require("express-validator");
const { ErrorResponse, SuccessResponse } = require("../../../helper/Response");
const {
  getGroceryDetailsOnId,
  deleteGroceryData,
  getAllGroceryData,
  updateInventoryDetails,
} = require("../Service/InventoryService");
const { saveOrderDetails } = require("../../Orders/Service/OrderService");
/**
 * Saves Grocery Data in the DB
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns Saved Grocery Data
 */
const saveGroceryDetails = async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty)
      throw new ErrorResponse(
        "Validation Error",
        "Validation Error",
        400,
        error.errors
      );

    const savedDetails = await saveGroceryDetails(request.body);

    const success = new SuccessResponse(
      "Saved Grocery Items",
      200,
      savedDetails
    );
    return response.status(success.statusCode).send(success);
  } catch (exception) {
    next(exception);
  }
};

/**
 * Updates Grocery Data
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns  Updated Grocery Data
 */
const updateGroceryDetails = async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty)
      throw new ErrorResponse(
        "Validation Error",
        "Validation Error",
        400,
        error.errors
      );

    const updateDetails = await updateInventoryDetails(
      request.body,
      request.param.id
    );

    const success = new SuccessResponse(
      "Updated Grocery Items",
      200,
      updateDetails
    );
    return response.status(success.statusCode).send(success);
  } catch (exception) {
    next(exception);
  }
};

/**
 * ListsGrocery Data
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns  Lists Grocery Data
 */
const getGroceryDetails = async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty)
      throw new ErrorResponse(
        "Validation Error",
        "Validation Error",
        400,
        error.errors
      );

    const groceryDetails = await getGroceryDetailsOnId({
      groceryItemId: request.params.id,
    });

    if (!groceryDetails)
      throw new ErrorResponse(
        "Invalid Grocery Item Id!",
        "Validation Error",
        400
      );

    const success = new SuccessResponse(
      "Grocery Items Found!",
      200,
      groceryDetails
    );
    return response.status(success.statusCode).send(success);
  } catch (exception) {
    next(exception);
  }
};
/**
 * Removes Grocery Data
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns  Removed Grocery Data
 */
const deleteGroceryDetails = async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty)
      throw new ErrorResponse(
        "Validation Error",
        "Validation Error",
        400,
        error.errors
      );

    const groceryDetails = await getGroceryDetailsOnId({
      groceryItemId: request.params.id,
    });

    if (!groceryDetails)
      throw new ErrorResponse(
        "Invalid Grocery Item Id!",
        "Validation Error",
        400
      );

    const updateDetails = await deleteGroceryData(request.body, {
      groceryItemId: request.params.id,
    });
    const success = new SuccessResponse(
      "Deleted Grocery Items",
      200,
      updateDetails
    );
    return response.status(success.statusCode).send(success);
  } catch (exception) {
    next(exception);
  }
};

/**
 * Gets All Grocery Data Paginated
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns Gets All Grocery Data Paginated
 */
const getAllGroceryDetails = async (request, response, next) => {
  try {
    const groceryDetails = await getAllGroceryData(request.params);
    const success = new SuccessResponse(
      "Grocery Items Found",
      200,
      groceryDetails.data,
      groceryDetails.paginatedData
    );
    return response.status(success.statusCode).send(success);
  } catch (exception) {
    next(exception);
  }
};

/**
 * Create Orders of Multiple Grocery Items
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns Order Details
 */
const createOrder = async (request, response, next) => {
  try {
    const error = validationResult(request);
    if (!error.isEmpty)
      throw new ErrorResponse(
        "Validation Error",
        "Validation Error",
        400,
        error.errors
      );

    const savedDetails = await saveOrderDetails(
      request.body.orderItems,
      request.session
    );

    const success = new SuccessResponse(
      "Saved Order Details",
      200,
      savedDetails
    );
    return response.status(success.statusCode).send(success);
  } catch (exception) {
    next(exception);
  }
};

module.exports = {
  saveGroceryDetails: saveGroceryDetails,
  updateGroceryDetails: updateGroceryDetails,
  getGroceryDetails: getGroceryDetails,
  deleteGroceryDetails: deleteGroceryDetails,
  getAllGroceryDetails: getAllGroceryDetails,
  createOrder: createOrder,
};

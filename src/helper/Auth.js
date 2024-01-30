const { checkIfUserExists } = require("../modules/User/Service/UserService");
const { ErrorResponse } = require("./Response");

// Authenticate User Consuming API's
const isAuthorized = async (request, response, next) => {
  const userDetails = await checkIfUserExists({
    where: {
      userId: request.session.userId,
    },
  });
  if (!userDetails)
    throw new ErrorResponse(
      "User is not Authorized!",
      "Authentication Error",
      401
    );
  return next();
};

module.exports = { isAuthorized };

const { UserModel } = require ( "../../../model/UserModel");

// Returns User Record If User Exists
const checkIfUserExists = (options) => {
  return UserModel.get(options);
};

module.exports = { checkIfUserExists };



const { Sequelize } = require("sequelize");
const tedious = require("tedious");

// Squelize connection Params
const sequelizeConnection = new Sequelize("QP","root", "12345", {
  host: "localhost",
  dialect: "mssql",
  dialectModule: tedious,
});
(async function () {
  try {
    await sequelizeConnection.authenticate();
    console.log("Connection has been established!");
  } catch (error) {
    console.error("Unable to connect to database", error);
  }
})();

module.exports =  { sequelizeConnection };

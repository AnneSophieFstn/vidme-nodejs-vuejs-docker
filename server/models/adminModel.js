
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Admin;
  };
  
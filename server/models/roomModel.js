
module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("room", {
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Room;
  };
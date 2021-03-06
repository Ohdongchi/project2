module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: true, //공백가능
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

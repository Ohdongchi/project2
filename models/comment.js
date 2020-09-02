module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      parentComment: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      dept: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      group_Id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

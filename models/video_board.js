module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "videoBoard",
    {
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: true, //공백가능
      },
      video_URL: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      hashtag: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "local",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

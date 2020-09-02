module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "hashtag",
    {
      title: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

//./models/user.js 설명 참고

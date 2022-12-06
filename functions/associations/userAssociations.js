const { DataTypes } = require('sequelize');

const { Users, UserSavedAddresses } = require("../../models");

Users.hasMany(UserSavedAddresses, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
});
UserSavedAddresses.belongsTo(Users);

module.exports = { UserSavedAddresses }
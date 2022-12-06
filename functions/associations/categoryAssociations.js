const { DataTypes } = require('sequelize')

const { ParentCategories, ChildCategories } = require("../../models")

ParentCategories.hasMany(ChildCategories, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
ChildCategories.belongsTo(ParentCategories);

module.exports = { ChildCategories }
const { DataTypes } = require('sequelize');

const { ParentCategories, ChildCategories, Items, ShopItems, Shops, ShopUsers, ShopCategories } = require("../../models");

ParentCategories.hasMany(Items, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Items.belongsTo(ParentCategories);

ChildCategories.hasMany(Items, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Items.belongsTo(ChildCategories);


Shops.hasMany(ShopItems, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
ShopItems.belongsTo(Shops);

Shops.hasMany(ShopCategories, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
ShopCategories.belongsTo(Shops);

ParentCategories.hasMany(ShopCategories, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
ShopCategories.belongsTo(ParentCategories);

ChildCategories.hasMany(ShopItems, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
ShopItems.belongsTo(ChildCategories);

Items.hasMany(ShopItems, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
ShopItems.belongsTo(Items);

ShopUsers.hasOne(Shops, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
//Shops.belongsTo(ShopUsers)

module.exports = { Items, ShopItems, Shops, ShopCategories };
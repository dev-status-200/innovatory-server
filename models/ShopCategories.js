module.exports = (sequelize, DataTypes) => {
    const ShopCategories = sequelize.define("ShopCategories", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
    })
    return ShopCategories
}
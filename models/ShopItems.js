module.exports = (sequelize, DataTypes) => {
    const ShopItems = sequelize.define("ShopItems", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        active:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        units:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        image:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        weight:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        qty:{
            type:DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        stock:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        cost_price:{
            type:DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        selling_price:{
            type:DataTypes.DOUBLE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        cartan:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }
    })
    return ShopItems
}
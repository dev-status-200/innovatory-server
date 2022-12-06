module.exports = (sequelize, DataTypes) => {
    const UserSavedAddresses = sequelize.define("UserSavedAddresses", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        address:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        street:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        unit:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        optionalNote:{
            type:DataTypes.STRING,
        },
        lat:{
            type:DataTypes.DOUBLE,
        },
        long:{
            type:DataTypes.DOUBLE,
        },
        label:{
            type:DataTypes.STRING,
        },
    })
    return UserSavedAddresses
}
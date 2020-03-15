'use strict';

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        aspectRatio: {
            allowNull: false,
            type: DataTypes.FLOAT
        },
        uri: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, {
        classMethods: {
            associate: function(models) {
                models.image.hasMany(models.imageReference);

                models.image.belongsToMany(models.content, {
                    through: {
                        model: models.imageReference
                    }
                });
            }
        },
        hooks: {}
    });

    return Image;
};

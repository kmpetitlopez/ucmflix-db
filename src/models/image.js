'use strict';

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        uri: {
            allowNull: false,
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: (models) => {
                models.image.hasMany(models.content, {
                    foreignKey: 'imageId'
                });
            }
        }
    });

    return Image;
};

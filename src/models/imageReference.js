'use strict';

module.exports = (sequelize, DataTypes) => {
    const ImageReference = sequelize.define('imageReference', {}, {
        classMethods: {
            associate: (models) => {
                models.imageReference.belongsTo(models.image);
                models.imageReference.belongsTo(models.content);
            }
        },
        hooks: {}
    });

    return ImageReference;
};

'use strict';

module.exports = (sequelize, DataTypes) => {
    const CategoryReference = sequelize.define('categoryReference', {}, {
        classMethods: {
            associate: (models) => {
                models.categoryReference.belongsTo(models.category);
                models.categoryReference.belongsTo(models.content);
            }
        },
        hooks: {}
    });

    return CategoryReference;
};

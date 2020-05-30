'use strict';

module.exports = (sequelize, DataTypes) => {
    const moment = require('moment'),
        Category = sequelize.define(
            'category',
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                startDate: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                endDate: {
                    type: DataTypes.DATE,
                    allowNull: true
                }
            },
            {
                classMethods: {
                    associate: (models) => {
                        models.category.belongsToMany(models.content, {
                            through: models.categoryReference
                        });

                        models.category.hasMany(models.categoryReference, {
                            foreignKey: 'categoryId'
                        });
                    }
                },
                hooks: {
                    beforeValidate: (instance) => {
                        if (instance) {
                            if (instance.startDate && instance.endDate) {
                                if (moment.utc(instance.startDate).isSameOrAfter(moment.utc(instance.endDate))) {
                                    throw new sequelize.ValidationError('Error in dates');
                                }
                            }
                        }
                    },
                    beforeCreate: (instance) => {
                        if (instance && !instance.startDate) {
                            instance.startDate = moment.utc().startOf('day').format();
                        }
                    }
                }
            }
        );
    
    return Category;
};

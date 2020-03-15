'use strict';

module.exports = (sequelize, DataTypes) => {
    const constants = require('../../src/utils/constants'),
        Asset = sequelize.define(
            'asset',
            {
                path: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                classMethods: {
                    associate: (models) => {
                        models.asset.belongsTo(models.content);
                    }
                },
                hooks: {
                    beforeValidate: async (instance) => {
                        if (instance && instance.contentId) {
                            const content = await sequelize.models.content.findById(instance.contentId);

                            if (content && content.type === constants.CONTENT_TYPES.master) {
                                throw new sequelize.ValidationError('\'contentId\' can\'t refer master content');
                            }
                        }
                    }
                }
            }
        );
    return Asset;
};

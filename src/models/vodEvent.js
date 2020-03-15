'use strict';
module.exports = (sequelize, DataTypes) => {
    const constants = require('../../src/utils/constants'),
        moment = require('moment'),
        VodEvent = sequelize.define(
            'vodEvent',
            {
                windowStartTime: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                windowEndTime: {
                    type: DataTypes.DATE,
                    allowNull: true
                }
            },
            {
                classMethods: {
                    associate: (models) => {
                        models.vodEvent.belongsTo(models.content);
                    }
                },
                hooks: {
                    beforeValidate: async (instance) => {
                        if (instance) {
                            if (instance.contentId) {
                                const content = await sequelize.models.content.findById(instance.contentId);

                                if (content && content.type === constants.CONTENT_TYPES.master) {
                                    throw new sequelize.ValidationError('\'contentId\' can\'t refer master content');
                                }
                            }

                            if (instance.windowStartTime && instance.windowEndTime) {
                                if (moment.utc(instance.windowStartTime).isSameOrAfter(moment.utc(instance.windowEndTime))) {
                                    throw new sequelize.ValidationError('Error in dates');
                                }
                            }
                        }
                    },
                    beforeCreate: (instance) => {
                        if (instance && !instance.windowStartTime) {
                            instance.windowStartTime = moment.utc().startOf('day');
                        }
                    }
                }
            }
        );
    return VodEvent;
};

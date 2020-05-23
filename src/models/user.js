'use strict';

const bcrypt = require('bcrypt'),
    crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define(
        'user',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true
            },
            confirmAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            classMethods: {
                associate: function(models) {
                    models.user.belongsTo(models.role);
                    models.user.hasMany(models.favoriteContent, {
                        foreignKey: 'contentId'
                    });
                }
            },
            hooks: {
                beforeCreate: (user, options) => {
                    if (!user.password) {
                        user.password = crypto.randomBytes(8).toString('hex');
                    }

                    user.password = bcrypt.hashSync(
                        user.password,
                        parseInt(process.env.USER_PASSWORD_ENCRYPTATION_SALT)
                    );
                },
                beforeUpdate: (user, options) => {
                    if (user.changed('password')) {
                        user.password = bcrypt.hashSync(
                            user.password,
                            parseInt(
                                process.env.USER_PASSWORD_ENCRYPTATION_SALT
                            )
                        );
                    }
                }
            }
        }
    );
    return User;
};

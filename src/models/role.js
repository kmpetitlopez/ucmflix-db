'use strict';

module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                models.role.hasMany(models.user);
            }
        }
    });
    return Role;
};

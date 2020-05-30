'use strict';

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) => {
                models.role.hasMany(models.user);
            }
        }
    });
    
    return Role;
};

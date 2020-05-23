'use strict';

module.exports = function(sequelize, DataTypes) {
    const FavoriteContent = sequelize.define(
        'favoriteContent',
        {},
        {
            classMethods: {
                associate: function(models) {
                    models.favoriteContent.belongsTo(models.user);
                    models.favoriteContent.belongsTo(models.content);
                }
            }
        }
    );
    
    return FavoriteContent;
};

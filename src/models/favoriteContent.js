'use strict';

module.exports = (sequelize, DataTypes) => {
    const FavoriteContent = sequelize.define(
        'favoriteContent',
        {},
        {
            classMethods: {
                associate: (models) => {
                    models.favoriteContent.belongsTo(models.user);
                    models.favoriteContent.belongsTo(models.content);
                }
            }
        }
    );
    
    return FavoriteContent;
};

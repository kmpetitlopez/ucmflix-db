'use strict';

module.exports = (sequelize, DataTypes) => {
    const countries = require('i18n-iso-countries'),
        constants = require('../../src/utils/constants'),
        Content = sequelize.define(
            'content',
            {
                type: {
                    type: DataTypes.ENUM,
                    values: Object.keys(constants.CONTENT_TYPES),
                    allowNull: false
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                description: DataTypes.TEXT,
                year: {
                    type: DataTypes.INTEGER,
                    validate: {
                        min: {
                            args: constants.MIN_CONTENT_VALUE.MIN_YEAR,
                            msg: 'year must be greater than 1887'
                        }
                    },
                    set: function(year) {
                        this.setDataValue('year', year < constants.MIN_CONTENT_VALUE.MIN_YEAR ? null : year);
                    }
                },
                genre: DataTypes.TEXT,
                duration: {
                    type: DataTypes.INTEGER,
                    validate: {
                        min: {
                            args: constants.MIN_CONTENT_VALUE.MIN_DURATION,
                            msg: 'duration must be greater or equals than 0'
                        }
                    }
                },
                parentalRating: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: constants.SPANISH_PARENTAL_RATING.SC,
                    validate: {
                        isIn: {
                            args: [Object.values(constants.SPANISH_PARENTAL_RATING)],
                            msg: 'parentalRating is not valid'
                        }
                    }
                },
                country: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    validate: {
                        isAlpha3: (country) => {
                            if (country) {
                                country.split(constants.COUNTRY_SEPARATOR).forEach((c) => {
                                    if (!countries.getAlpha3Codes()[c]) {
                                        throw new Error('country must be in ISO 3166-1 alpha-3');
                                    }
                                });
                            }
                        }
                    },
                    set: function(country) {
                        if (country) {
                            this.setDataValue(
                                'country',
                                country
                                    .split(constants.COUNTRY_SEPARATOR)
                                    .sort()
                                    .join(constants.COUNTRY_SEPARATOR)
                            );
                        }
                    }
                },
                seasonNumber: DataTypes.INTEGER,
                episodeNumber: DataTypes.INTEGER,
                asset: DataTypes.STRING
            },
            {
                scopes: {
                    movies: {
                        where: {
                            type: constants.CONTENT_TYPES.movie
                        }
                    },
                    programs: {
                        where: {
                            type: constants.CONTENT_TYPES.special
                        }
                    },
                    series: {
                        where: {
                            type: constants.CONTENT_TYPES.master
                        }
                    },
                    episodes: {
                        where: {
                            type: constants.CONTENT_TYPES.episode
                        }
                    }
                },
                classMethods: {
                    associate: (models) => {
                        models.content.hasMany(models.vodEvent, {
                            foreignKey: 'contentId'
                        });

                        models.content.belongsToMany(models.category, {
                            through: models.categoryReference
                        });

                        models.content.hasMany(models.categoryReference, {
                            foreignKey: 'contentId'
                        });

                        // Associations for master-series
                        models.content.hasMany(models.content.scope('episodes'), {as: 'episodes', foreignKey: 'masterId'});

                        // Associations for episodes
                        models.content.belongsTo(models.content.scope('series'), {as: 'serie', foreignKey: 'masterId'});

                        models.content.belongsTo(models.image);
                    }
                },
                hooks: {}
            }
        );
    return Content;
};

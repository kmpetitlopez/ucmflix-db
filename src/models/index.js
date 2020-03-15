'use strict';

/**
 * Function that initializes the Database model and connects to the DB
 * @param  {string} [configFilePath] - config file with parameters to connect to the DB
 * @return {db} - Object referencing all models and a sequelize instance
 */
function initialize(configFilePath) {
    const fs = require('fs'),
        path = require('path'),
        Sequelize = require('sequelize'),
        basename = path.basename(module.filename),
        env = process.env.NODE_ENV || 'development',
        config = configFilePath ? require(configFilePath)[env] : process.env.CONFIG_FILE,
        db = {},
        sequelize = new Sequelize(config.database, config.username, config.password, config);

    fs
        .readdirSync(__dirname)
        .filter((file) => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach((file) => {
            const model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(function(modelName) {
        if (db[modelName].options &&
            db[modelName].options.classMethods &&
            db[modelName].options.classMethods.associate) {
            db[modelName].options.classMethods.associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
}

module.exports = initialize;

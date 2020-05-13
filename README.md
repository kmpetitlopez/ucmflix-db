# ucmflix database

## Getting started

- Install **NodeJS** (V10.16.0) [Download here](https://nodejs.org/es/download/)
- Install **MySQL**
- Install **sequelize**:
```
sudo npm install -g sequelize-cli
```

## Project setup

- Create 'ucmflix' database and 'ucmflix' user with 'ucmflix' password. (Note: it's important
you keep same user, password as they're referenced in the config.json file)

```
mysql -u root -p

    CREATE DATABASE ucmflix DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_bin;
    CREATE USER 'ucmflix'@'%' IDENTIFIED BY 'ucmflix';
    GRANT ALL PRIVILEGES ON ucmflix.* TO 'ucmflix'@'%' WITH GRANT OPTION;
    exit;
```

or

```
mysql -u root -p < scripts/reset_database.sql
```

or

```
npm run resetDB
```

- Install dependencies

```
npm ci
```

- Configure config.json file
```
{
    "development": {
      "username": "ucmflix",
      "password": "ucmflix",
      "database": "ucmflix",
      "host": "localhost",
      "port": "3306",
      "dialect": "mysql",
      "storage": "mysql",
      "logging": false,
      "retry": {
        "max": 3,
        "timeout": 62000,
        "match": [
          "DEADLOCK",
          "TIMEOUT"
        ]
      }
    }
}
```

## Database migration

- To create the DB schema run 

```
npm run migrateDB
```

- To add initial information run

```
npm run seedDB
```

## Unit Testing
To run all the specs locally you must execute:

```
npm test
```

## Dependencies

- [casual](https://github.com/boo1ean/casual)
- [i18n-iso-countries](https://github.com/michaelwittig/node-i18n-iso-countries)
- [moment](https://github.com/moment/moment)
- [sequelize](https://github.com/sequelize/sequelize)
- [sequelize-fixtures](https://github.com/domasx2/sequelize-fixtures)
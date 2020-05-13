'use strict';

describe('UserModel', () => {
    const bcrypt = require('bcrypt'),
        fixtures = require('../fixtures'),
        db = require('../../src/index'),
        dbUtils = require('../helpers/dbUtils'),
        JASMINE_TIMEOUT = 30000; // 30 seconds
    let role;

    beforeAll(async () => {
        role = await db.role.create(fixtures.role());
    }, JASMINE_TIMEOUT);

    afterAll(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    beforeEach(() => {
        return db.user.destroy({where: {}});
    });

    describe('#create', () => {
        describe('with valid parameters', () => {
            let userData;
            let storedUserData;

            beforeEach(async () => {
                userData = fixtures.user();
                userData.roleId = role.id;
                storedUserData =  await db.user.create(userData);
            });

            ((fieldsToCompare) => {
                it('should create User with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(storedUserData[element]).toBe(userData[element]);
                    });
                });
            })(['username', 'email']);
        });

        ((notNulFields) => {
            notNulFields.forEach((field) => {
                describe('without ' + field, () => {
                    it('should fail', async () => {
                        let userData = fixtures.user();
                        userData[field] = null;
                        userData.roleId = role.id;

                        let storedUserData;

                        try {
                            storedUserData = await db.user.create(userData);
                            expect(true).toBeFalsy();
                        } catch (err) {
                            expect(err).toBeDefined();
                            expect(storedUserData).toBeUndefined();
                        }
                    });
                });
            });
        })(['username', 'email']);

        describe('when password is null', () => {
            it('should create a random one for the new user', async () => {
                let userData = fixtures.user();
                userData.roleId = role.id;
                delete userData.password;

                let user = await db.user.create(userData);
                
                expect(user.password).toEqual(jasmine.any(String));
            });
        });
    });

    describe('when setting a password', () => {
        const FAKE_PASSWORD = 'cambiame',
            FAKE_PASSWORD2 = 'cambiame tonto';

        let user;

        beforeEach(async () => {
            let userData = fixtures.user();
            userData.roleId = role.id;
            userData.password = FAKE_PASSWORD;

            user = await db.user.create(userData);
        });

        it('should encrypt it', async () => {
            expect(bcrypt.compareSync(FAKE_PASSWORD, user.password)).toBeTruthy();

            user.password = FAKE_PASSWORD2;

            await user.save();
            await user.reload();
            expect(bcrypt.compareSync(FAKE_PASSWORD2, user.password)).toBeTruthy();
        });
    });
});

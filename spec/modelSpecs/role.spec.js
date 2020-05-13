'use strict';

const fixtures = require('../fixtures'),
    db = require('../../src/index'),
    dbUtils = require('../helpers/dbUtils'),
    JASMINE_TIMEOUT = 30000; // 30 seconds


describe('RoleModel', () => {
    afterAll(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    beforeEach(() => {
        return db.role.destroy({where: {}});
    });

    describe('#create', () => {
        describe('with valid parameters', () => {
            let roleData;
            let storedRoleData;
            beforeEach(async () => {
                roleData = fixtures.role();
                storedRoleData = await db.role.create(roleData);
            });

            ((fieldsToCompare) => {
                it('should create Role with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(storedRoleData[element]).toBe(roleData[element]);
                    });
                });
            })(['name']);
        });

        ((notNulFields) => {
            notNulFields.forEach((field) => {
                describe('without ' + field, () => {
                    it('should fail', async () => {
                        const roleData = fixtures.role();
                        roleData[field] = null;
                        let storedRole;

                        try {
                            storedRole = await db.role.create(roleData);
                            expect(true).toBeFalsy();
                        } catch (err) {
                            expect(err).toBeDefined();
                            expect(storedRole).toBeUndefined();
                        }
                    });
                });
            });
        })(['name']);
    });
});

'use strict';

describe('CategoryModel', () => {
    const fixtures = require('../fixtures'),
        dbUtils = require('../helpers/dbUtils'),
        db = require('../../src/index'),
        moment = require('moment'),
        JASMINE_TIMEOUT = 30000; // 30 seconds

    afterAll(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    afterEach(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    describe('#create', () => {
        let categoryData;
        let storedCategory;

        beforeEach(() => {
            categoryData = undefined;
            storedCategory = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                categoryData = fixtures.category();
                storedCategory = await db.category.create(categoryData);
            });

            ((fieldsToCompare) => {
                it('should create category with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(moment.utc(storedCategory[element]).format())
                            .toEqual(moment.utc(categoryData[element]).format());
                    });
                });
            })([
                'startDate', 'endDate'
            ]);

            ((fieldsToCompare) => {
                it('should create category with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(storedCategory[element]).toBe(categoryData[element]);
                    });
                });
            })([
                'name'
            ]);
        });

        it('should create the vod when both dates are null', async () => {
            categoryData = fixtures.category();
            categoryData.startDate = null;
            categoryData.endDate = null;

            storedCategory = await db.category.create(categoryData);

            expect(storedCategory).toBeDefined();
            expect(storedCategory.startDate).toBeDefined();
            expect(storedCategory.endDate).toBeNull();
        });
    });
});

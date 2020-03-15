'use strict';

describe('CategoryReferenceModel', () => {
    const fixtures = require('../fixtures'),
        constants = require('../../src/utils/constants'),
        dbUtils = require('../helpers/dbUtils'),
        db = require('../../src/index'),
        JASMINE_TIMEOUT = 30000; // 30 seconds

    afterAll(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    afterEach(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    describe('#create', () => {
        let categoryReferenceData;
        let storedCategoryReference;

        beforeEach(() => {
            categoryReferenceData = undefined;
            storedCategoryReference = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                categoryReferenceData = fixtures.categoryReference(
                    fixtures.category(),
                    fixtures.content(constants.CONTENT_TYPES.movie));
                storedCategoryReference = await db.categoryReference.create(
                    categoryReferenceData,
                    {include: [{model: db.category}, {model: db.content}]});
            });

            it('should create categoryReference with valid data', () => {
                expect(storedCategoryReference).toBeDefined();
            });
        });

        it('should throw an error with invalid contentId', async () => {
            categoryReferenceData = fixtures.categoryReference(fixtures.category());
            categoryReferenceData.contentId = -1;

            try {
                storedCategoryReference = await db.categoryReference.create(
                    categoryReferenceData,
                    {include: [{model: db.category}]});
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedCategoryReference).toBeUndefined();
            }
        });

        it('should throw an error with invalid categoryId', async () => {
            categoryReferenceData = fixtures.categoryReference(null, fixtures.content(constants.CONTENT_TYPES.movie));
            categoryReferenceData.categoryId = -1;

            try {
                storedCategoryReference = await db.categoryReference.create(
                    categoryReferenceData,
                    {include: [{model: db.content}]});
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedCategoryReference).toBeUndefined();
            }
        });
    });
});

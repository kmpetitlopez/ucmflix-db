'use strict';

describe('ImageReferenceModel', () => {
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
        let imageReferenceData;
        let storedImageReference;

        beforeEach(() => {
            imageReferenceData = undefined;
            storedImageReference = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                imageReferenceData = fixtures.imageReference(
                    fixtures.image(),
                    fixtures.content(constants.CONTENT_TYPES.movie));
                storedImageReference = await db.imageReference.create(
                    imageReferenceData,
                    {include: [{model: db.image}, {model: db.content}]});
            });

            it('should create imageReference with valid data', () => {
                expect(storedImageReference).toBeDefined();
            });
        });

        it('should throw an error with invalid contentId', async () => {
            imageReferenceData = fixtures.imageReference(fixtures.image());
            imageReferenceData.contentId = -1;

            try {
                storedImageReference = await db.imageReference.create(
                    imageReferenceData,
                    {include: [{model: db.image}]});
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedImageReference).toBeUndefined();
            }
        });

        it('should throw an error with invalid imageId', async () => {
            imageReferenceData = fixtures.imageReference(null, fixtures.content(constants.CONTENT_TYPES.movie));
            imageReferenceData.imageId = -1;

            try {
                storedImageReference = await db.imageReference.create(
                    imageReferenceData,
                    {include: [{model: db.content}]});
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedImageReference).toBeUndefined();
            }
        });
    });
});

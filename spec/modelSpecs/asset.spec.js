'use strict';

describe('AssetModel', () => {
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
        let assetData;
        let storedAsset;

        beforeEach(() => {
            assetData = undefined;
            storedAsset = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                assetData = fixtures.asset(fixtures.content(constants.CONTENT_TYPES.movie));
                storedAsset = await db.asset.create(
                    assetData,
                    {include: {model: db.content}});
            });

            ((fieldsToCompare) => {
                it('should create asset with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(storedAsset[element]).toBe(assetData[element]);
                    });
                });
            })([
                'path'
            ]);
        });

        ((notNulFields) => {
            notNulFields.forEach((field) => {
                describe('without ' + field, () => {
                    it('should fail', async () => {
                        assetData = fixtures.asset(fixtures.content(constants.CONTENT_TYPES.movie));
                        assetData[field] = null;

                        try {
                            storedAsset = await db.asset.create(
                                assetData,
                                {include: {model: db.content}});
                            expect(true).toBeFalsy();
                        } catch (err) {
                            expect(err).toBeDefined();
                            expect(storedAsset).toBeUndefined();
                        }
                    });
                });
            });
        })(['path']);

        it('should throw an error with invalid contentId', async () => {
            assetData = fixtures.asset();
            assetData.contentId = -1;

            try {
                storedAsset = await db.asset.create(assetData);
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedAsset).toBeUndefined();
            }
        });

        it('should throw an error when content is a master', async () => {
            const contentData = await db.content.create(fixtures.content(constants.CONTENT_TYPES.master));
            assetData = fixtures.asset();
            assetData.contentId = contentData.id;

            try {
                storedAsset = await db.asset.create(assetData);
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedAsset).toBeUndefined();
            }
        });
    });
});

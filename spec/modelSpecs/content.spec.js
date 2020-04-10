'use strict';

describe('ContentModel', () => {
    const fixtures = require('../fixtures'),
        constants = require('../../src/utils/constants'),
        dbUtils = require('../helpers/dbUtils'),
        db = require('../../src/index'),
        JASMINE_TIMEOUT = 30000; // 30 seconds

    afterAll(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    afterEach(() => {
        return db.content.destroy({where: {}, individualHooks: true});
    }, JASMINE_TIMEOUT);

    describe('#create', () => {
        let contentData;
        let storedContent;

        beforeEach(() => {
            contentData = undefined;
            storedContent = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                storedContent = await db.content.create(contentData);
            });

            ((fieldsToCompare) => {
                it('should create Content with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(storedContent[element]).toBe(contentData[element]);
                    });
                });
            })([
                'type',
                'title',
                'description',
                'year',
                'genre',
                'duration',
                'parentalRating',
                'country'
            ]);
        });

        describe('country validation', () => {
            it('should throw an error when country is set but is not in ISO 3166-1 alpha-3', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.country = 'US';

                try {
                    storedContent = await db.content.create(contentData);
                    expect(true).toBeFalsy();
                } catch (err) {
                    expect(err).toBeDefined();
                    expect(storedContent).toBeUndefined();
                }
            });

            it('should create the content when content has one country', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.country = 'USA';

                storedContent = await db.content.create(contentData);
                expect(storedContent.country).toBe('USA');
            });

            it('should create the content when content has several countries (country is sorted alphabetically)', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.country = 'USA/ESP';

                storedContent = await db.content.create(contentData);
                expect(storedContent.country).toBe('ESP/USA');
            });
        });

        describe('duration validation', () => {
            it('should throw an error when duration is set but is not lower than 0', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.duration = -5;

                try {
                    storedContent = await db.content.create(contentData);
                    expect(true).toBeFalsy();
                } catch (err) {
                    expect(err).toBeDefined();
                    expect(storedContent).toBeUndefined();
                }
            });

            it('should create the content when duration is valid param', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.duration = 0;

                storedContent = await db.content.create(contentData);
                expect(storedContent.duration).toBe(0);
            });
        });

        describe('year validation', () => {
            it('should set year to null when it is lower than 1888', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.year = 1887;

                storedContent = await db.content.create(contentData);
                expect(storedContent.year).toBeNull();
            });

            it('should create the content when duration is valid param', async () => {
                contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                contentData.year = 1888;

                storedContent = await db.content.create(contentData);
                expect(storedContent.year).toBe(1888);
            });
        });

        ((notNulFields) => {
            notNulFields.forEach((field) => {
                describe('without ' + field, () => {
                    it('should fail', async () => {
                        contentData = fixtures.content(constants.CONTENT_TYPES.movie);
                        contentData[field] = null;

                        try {
                            storedContent = await db.content.create(contentData);
                            expect(true).toBeFalsy();
                        } catch (err) {
                            expect(err).toBeDefined();
                            expect(storedContent).toBeUndefined();
                        }
                    });
                });
            });
        })(['type', 'title', 'parentalRating']);
    });
});

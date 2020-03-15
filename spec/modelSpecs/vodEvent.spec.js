'use strict';

describe('VodEventModel', () => {
    const fixtures = require('../fixtures'),
        constants = require('../../src/utils/constants'),
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
        let vodEventData;
        let storedVodEvent;

        beforeEach(() => {
            vodEventData = undefined;
            storedVodEvent = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                vodEventData = fixtures.vodEvent(fixtures.content(constants.CONTENT_TYPES.movie));
                storedVodEvent = await db.vodEvent.create(
                    vodEventData,
                    {include: {model: db.content}});
            });

            ((fieldsToCompare) => {
                it('should create vodEvent with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(moment.utc(storedVodEvent[element]).format())
                            .toEqual(moment.utc(vodEventData[element]).format());
                    });
                });
            })([
                'windowStartTime', 'windowEndTime'
            ]);
        });

        it('should throw an error with invalid contentId', async () => {
            vodEventData = fixtures.vodEvent();
            vodEventData.contentId = -1;

            try {
                storedVodEvent = await db.vodEvent.create(vodEventData);
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedVodEvent).toBeUndefined();
            }
        });

        it('should throw an error when content is a master', async () => {
            const contentData = await db.content.create(fixtures.content(constants.CONTENT_TYPES.master));
            vodEventData = fixtures.vodEvent();
            vodEventData.contentId = contentData.id;

            try {
                storedVodEvent = await db.vodEvent.create(vodEventData);
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedVodEvent).toBeUndefined();
            }
        });

        it('should create the vod when both dates are null', async () => {
            vodEventData = fixtures.vodEvent(fixtures.content(constants.CONTENT_TYPES.movie));
            vodEventData.windowStartTime = null;
            vodEventData.windowEndTime = null;

            storedVodEvent = await db.vodEvent.create(
                vodEventData,
                {include: {model: db.content}});

            expect(storedVodEvent).toBeDefined();
            expect(storedVodEvent.windowStartTime).toBeDefined();
            expect(storedVodEvent.windowEndTime).toBeNull();
        });
    });
});

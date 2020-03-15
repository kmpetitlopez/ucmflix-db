'use strict';

describe('ImageModel', () => {
    const fixtures = require('../fixtures'),
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
        let imageData;
        let storedImage;

        beforeEach(() => {
            imageData = undefined;
            storedImage = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                imageData = fixtures.image();
                storedImage = await db.image.create(imageData);
            });

            ((fieldsToCompare) => {
                it('should create image with valid data', () => {
                    fieldsToCompare.forEach((element) => {
                        expect(storedImage[element]).toBe(imageData[element]);
                    });
                });
            })([
                'aspectRatio', 'name'
            ]);
        });
    });
});

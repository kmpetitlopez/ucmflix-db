'use strict';

describe('FavoriteContentModel', () => {
    const fixtures = require('../fixtures'),
        constants = require('../../src/utils/constants'),
        dbUtils = require('../helpers/dbUtils'),
        db = require('../../src/index'),
        JASMINE_TIMEOUT = 30000; // 30 seconds
    let role;

    beforeAll(async () => {
        role = await db.role.create(fixtures.role());
    }, JASMINE_TIMEOUT);
    
    afterAll(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    afterEach(() => {
        return dbUtils.cleanAll();
    }, JASMINE_TIMEOUT);

    describe('#create', () => {
        let favoriteContentData;
        let storedFavoriteContent;

        beforeEach(() => {
            favoriteContentData = undefined;
            storedFavoriteContent = undefined;
        }, JASMINE_TIMEOUT);

        describe('with valid parameters', () => {
            beforeEach(async () => {
                const user = fixtures.user();
                user.roleId = role.id;
                favoriteContentData = fixtures.favoriteContent(
                    user,
                    fixtures.content(constants.CONTENT_TYPES.movie));
                storedFavoriteContent = await db.favoriteContent.create(
                    favoriteContentData,
                    {include: [{model: db.user}, {model: db.content}]});
            });

            it('should create favoriteContent with valid data', () => {
                expect(storedFavoriteContent).toBeDefined();
            });
        });

        it('should throw an error with invalid contentId', async () => {
            const user = fixtures.user();
            user.roleId = role.id;
            favoriteContentData = fixtures.favoriteContent(user);
            favoriteContentData.contentId = -1;

            try {
                storedFavoriteContent = await db.favoriteContent.create(
                    favoriteContentData,
                    {include: [{model: db.user}]});
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedFavoriteContent).toBeUndefined();
            }
        });

        it('should throw an error with invalid userId', async () => {
            favoriteContentData = fixtures.favoriteContent(null, fixtures.content(constants.CONTENT_TYPES.movie));
            favoriteContentData.userId = -1;

            try {
                storedFavoriteContent = await db.favoriteContent.create(
                    favoriteContentData,
                    {include: [{model: db.content}]});
                expect(true).toBeFalsy();
            } catch (err) {
                expect(err).toBeDefined();
                expect(storedFavoriteContent).toBeUndefined();
            }
        });
    });
});

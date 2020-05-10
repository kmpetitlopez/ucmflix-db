'use strict';

const CONSTANTS = require('../../src/utils/constants'),
    casual = require('casual');

casual.define('content', (type) => {
    const content = {
        type: type,
        title: casual.text,
        description: casual.short_description,
        shortDescription: casual.short_description,
        year: Number.parseInt(casual.year),
        genre: casual.word,
        duration: casual.integer(1, 10000),
        color: casual.integer(0, 100000),
        parentalRating: CONSTANTS.SPANISH_PARENTAL_RATING.SC,
        country: casual.random_element(['USA', 'ESP', 'GBR', 'DEU']),
        asset: casual.word
    };

    if (content.type === CONSTANTS.CONTENT_TYPES.episode) {
        content.seriesTitle = casual.text;
        content.seasonNumber = casual.integer(1, 10);
        content.episodeNumber = casual.integer(1, 10);
    }

    return content;
});

module.exports = casual.content;

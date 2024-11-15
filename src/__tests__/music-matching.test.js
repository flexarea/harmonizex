const { 
    scoreBySongs, 
    scoreByArtists, 
    scoreByGenres, 
    scoreByMusic, 
    filterByScore, 
} = require('../services/potentialsFinder');

describe('filterByScore', () => {
    test('should return candidates with scores greater than or equal to minScore', () => {
        const candidatesWithScores = [
            { candidate: { name: 'Artist A' }, score: 4 },
            { candidate: { name: 'Artist B' }, score: 2 },
            { candidate: { name: 'Artist C' }, score: 5 }
        ];

        const result = filterByScore(candidatesWithScores, 3);
        expect(result).toEqual([{ name: 'Artist A' }, { name: 'Artist C' }]);
    });

    test('should return an empty array if no candidates meet the score threshold', () => {
        const candidatesWithScores = [
            { candidate: { name: 'Artist A' }, score: 2 },
            { candidate: { name: 'Artist B' }, score: 1 }
        ];

        const result = filterByScore(candidatesWithScores, 3);
        expect(result).toEqual([]);
    });
});

describe('scoreBySongs', () => {
    test('should calculate score based on song preferences', () => {
        const preferences = { song_1: 'Song A', song_2: 'Song B' };
        const candidate = { songs: ['Song A', 'Song C'] };

        const score = scoreBySongs(candidate, preferences);
        expect(score).toBe(1); // Only one match: 'Song A'
    });
});

describe('scoreByArtists', () => {
    test('should calculate score based on artist preferences', () => {
        const preferences = { artist_1: 'Artist A', artist_2: 'Artist B' };
        const candidate = { artists: ['Artist A', 'Artist C'] };

        const score = scoreByArtists(candidate, preferences);
        expect(score).toBe(1); // Only one match: 'Artist A'
    });
});

describe('scoreByGenres', () => {
    test('should calculate score based on genre preferences', () => {
        const preferences = { genre_1: 'Pop', genre_2: 'Rock' };
        const candidate = { genres: ['Pop', 'Indie'] };

        const score = scoreByGenres(candidate, preferences);
        expect(score).toBe(1); // Only one match: 'Pop'
    });
});

describe('scoreByMusic', () => {
    test('should calculate score based on a combination of music preferences', () => {
        const preferences = { 
            genres: { genre_1: 'Pop', genre_2: 'Rock' },
            artists: { artist_1: 'Artist A' },
            songs: { song_1: 'Song A' }
        };
        const candidate = {
            genres: ['Pop', 'Jazz'],
            artists: ['Artist A', 'Artist C'],
            songs: ['Song A', 'Song C']
        };

        const score = scoreByMusic(candidate, preferences);
        expect(score).toBe(3); // Matches in genres, artists, and songs
    });
});


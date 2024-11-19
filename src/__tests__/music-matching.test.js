import {
  scoreBySongs,
  scoreByArtists,
  scoreByGenres,
  scoreByMusic,
  filterByScore,
} from "../services/candidatesFinder";

const candidate = {
  song_1: "song_A",
  song_2: "song_B",
  song_3: "song_C",
  artist_1: "Artist A",
  artist_2: "Artist B",
  artist_3: "Artist C",
  genre_1: "Pop",
  genre_2: "Rock",
  genre_3: "Hip-Hop",
};

const user = {
  song_1: "song_A",
  song_2: "song_X",
  song_3: "song_Y",
  artist_1: "Artist A",
  artist_2: "Artist Z",
  artist_3: "Artist Y",
  genre_1: "Pop",
  genre_2: "Jazz",
  genre_3: "Classical",
};

describe("scoreBySongs", () => {
  it("Calculate score based on song preferences", () => {
    const score = scoreBySongs(user, candidate);
    expect(score).toBe(1); // Only one match: 'song_1'
  });
});

describe("scoreByArtists", () => {
  it("Calculate score based on artist preferences", () => {
    const score = scoreByArtists(user, candidate);
    expect(score).toBe(1); // Only one match: 'artist_1'
  });
});

describe("scoreByGenres", () => {
  it("Calculate score based on genre preferences", () => {
    const score = scoreByGenres(user, candidate);
    expect(score).toBe(1); // Only one match: 'genre_1'
  });
});

describe("scoreByMusic", () => {
  it("Calculate score based on a combination of music preferences", () => {
    const score = scoreByMusic(user, candidate);
    expect(score).toBe(3); // Matches in 'song_1', 'artist_1', and 'genre_1'
  });
});

describe("filterByScore", () => {
  it("Filter out candidates with scores below the minimum", () => {
    const candidatesWithScores = [
      { candidate: { name: "Alice" }, score: 4 },
      { candidate: { name: "Bob" }, score: 2 },
      { candidate: { name: "Charlie" }, score: 3 },
    ];

    const result = filterByScore(candidatesWithScores, 3);

    expect(result).toEqual([{ name: "Alice" }, { name: "Charlie" }]); // Bob is excluded since his score is below 3
  });

  it("Default to a minimum score of 3 when no minScore is provided", () => {
    const candidatesWithScores = [
      { candidate: { name: "Alice" }, score: 4 },
      { candidate: { name: "Bob" }, score: 2 },
      { candidate: { name: "Charlie" }, score: 3 },
    ];

    const result = filterByScore(candidatesWithScores);

    expect(result).toEqual([{ name: "Alice" }, { name: "Charlie" }]);
  });

  it("Return an empty array if no candidates meet the minimum score", () => {
    const candidatesWithScores = [
      { candidate: { name: "Alice" }, score: 1 },
      { candidate: { name: "Bob" }, score: 2 },
    ];

    const result = filterByScore(candidatesWithScores, 3);

    expect(result).toEqual([]);
  });

  it("Handle an empty array", () => {
    const result = filterByScore([], 3);

    expect(result).toEqual([]);
  });
});

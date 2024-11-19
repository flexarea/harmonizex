import { filterUsers } from "../services/candidatesFinder"; // Adjust the import path if needed

describe("filterUsers", () => {
  it("should apply hard filters, calculate scores, and filter by score", () => {
    // Define the user and candidates
    const user = {
      gender: "female",
      preferences: {
        prefer_women: true,
        prefer_men: false,
        prefer_enby: false,
      },
      age_pref_low: 18,
      age_pref_high: 40,
      artist_1: "Artist A",
      artist_2: "Artist B",
      artist_3: "Artist C",
      song_1: "Song 1",
      song_2: "Song 2",
      song_3: "Song 3",
      genre_1: "Pop",
      genre_2: "Indie",
      genre_3: "Alternative",
    };

    const candidates = [
      {
        gender: "female",
        preferences: {
          prefer_women: true,
          prefer_men: true,
          prefer_enby: true,
        },
        age: 25,
        artist_1: "Artist A",
        artist_2: "Artist B",
        artist_3: "Artist D",
        song_1: "Song 1",
        song_2: "Song 4",
        song_3: "Song 5",
        genre_1: "Pop",
        genre_2: "Rock",
        genre_3: "Indie",
      },
      {
        gender: "male",
        preferences: {
          prefer_women: true,
          prefer_men: false,
          prefer_enby: false,
        },
        age: 30,
        artist_1: "Artist X",
        artist_2: "Artist B",
        artist_3: "Artist C",
        song_1: "Song 1",
        song_2: "Song 2",
        song_3: "Song 3",
        genre_1: "Pop",
        genre_2: "Hip Hop",
        genre_3: "Indie",
      },
      {
        gender: "female",
        preferences: {
          prefer_women: true,
          prefer_men: true,
          prefer_enby: true,
        },
        age: 40,
        artist_1: "Artist A",
        artist_2: "Artist B",
        artist_3: "Artist C",
        song_1: "Song 1",
        song_2: "Song 2",
        song_3: "Song 3",
        genre_1: "Pop",
        genre_2: "Alternative",
        genre_3: "Indie",
      },
    ];

    // Call the filterUsers function with real data
    const result = filterUsers(user, candidates);

    // Check if the result matches the expected candidates
    console.log("result", result); // Log result to debug
    expect(result.length).toBe(2); // Assuming we expect two candidates to pass the filter
    expect(result[0].gender).toBe("female");
    expect(result[1].gender).toBe("female");
    expect(result[0].age).toBe(25);
    expect(result[1].age).toBe(40);

    // You can add further assertions based on your business logic
  });
});

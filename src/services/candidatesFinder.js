/*
Filtering functions for our matching algorithm
*/

// compare a user to a single candidate. Returns true if their gender preferences align
function isGenderWithinPreferences(user, candidate) {
  let matches = false;

  // If the user has no gender preferences set, they will match with any candidate
  if (
    user.preferences.prefer_women &&
    user.preferences.prefer_men &&
    user.preferences.prefer_enby
  ) {
    return true;
  }

  // Match based on user's gender and preferences
  switch (user.gender) {
    case "female":
      if (
        user.preferences.prefer_women &&
        candidate.gender === "female" &&
        candidate.preferences.prefer_women
      ) {
        matches = true;
      }
      if (
        user.preferences.prefer_men &&
        candidate.gender === "male" &&
        candidate.preferences.prefer_women
      ) {
        matches = true;
      }
      if (
        user.preferences.prefer_enby &&
        candidate.gender === "enby" &&
        candidate.preferences.prefer_women
      ) {
        matches = true;
      }
      break;

    case "male":
      if (
        user.preferences.prefer_women &&
        candidate.gender === "female" &&
        candidate.preferences.prefer_men
      ) {
        matches = true; // Match with female candidates
      }
      if (
        user.preferences.prefer_men &&
        candidate.gender === "male" &&
        candidate.preferences.prefer_men
      ) {
        matches = true;
      }
      if (
        user.preferences.prefer_enby &&
        candidate.gender === "enby" &&
        candidate.preferences.prefer_men
      ) {
        matches = true;
      }
      break;

    case "enby":
      if (
        user.preferences.prefer_women &&
        candidate.gender === "female" &&
        candidate.preferences.prefer_enby
      ) {
        matches = true;
      }
      if (
        user.preferences.prefer_men &&
        candidate.gender === "male" &&
        candidate.preferences.prefer_enby
      ) {
        matches = true;
      }
      if (
        user.preferences.prefer_enby &&
        candidate.gender === "enby" &&
        candidate.preferences.prefer_enby
      ) {
        matches = true;
      }
      break;

    default:
      return false;
  }

  // Check candidates' preferences against the user's preferences
  if (matches) {
    let genderPreferenceKey;

    // Assign the appropriate preference key based on candidate's gender
    if (candidate.gender === "female") {
      genderPreferenceKey = "prefer_women";
    } else if (candidate.gender === "male") {
      genderPreferenceKey = "prefer_men";
    } else if (candidate.gender === "enby") {
      genderPreferenceKey = "prefer_enby";
    }

    // Exclude candidate based on preference mismatch
    if (
      candidate.preferences[genderPreferenceKey] === false &&
      user.preferences[genderPreferenceKey] === true
    ) {
      return false;
    }
  }

  return matches; // Return true if there's a match, false otherwise
}

/**
 * Compares the user's age preferences to a single candidate's age.
 */
const isAgeWithinPreferences = (user, candidate) =>
  candidate.age >= user.age_pref_low && candidate.age <= user.age_pref_high;

/**
 * Function to calculate artist score.
 */
const scoreByArtists = (user, candidate) => {
  let artistScore = 0;
  if (user.artist_1 && candidate.artist_1 === user.artist_1) artistScore += 1;
  if (user.artist_2 && candidate.artist_2 === user.artist_2) artistScore += 1;
  if (user.artist_3 && candidate.artist_3 === user.artist_3) artistScore += 1;
  return artistScore;
};

/**
 * Function to calculate song score for two users.
 */
const scoreBySongs = (user, candidate) => {
  let songScore = 0;
  if (user.song_1 && candidate.song_1 === user.song_1) songScore += 1;
  if (user.song_2 && candidate.song_2 === user.song_2) songScore += 1;
  if (user.song_3 && candidate.song_3 === user.song_3) songScore += 1;
  return songScore;
};

/**
 * Function to calculate genre score for two users.
 */
const scoreByGenres = (user, candidate) => {
  let genreScore = 0;
  if (user.genre_1 && candidate.genre_1 === user.genre_1) genreScore += 1;
  if (user.genre_2 && candidate.genre_2 === user.genre_2) genreScore += 1;
  if (user.genre_3 && candidate.genre_3 === user.genre_3) genreScore += 1;
  return genreScore;
};

/**
 * Function to calculate total score for two users based on their genres, songs, and artists.
 */
const scoreByMusic = (user, candidate) => {
  let score = 0;
  score += scoreByGenres(user, candidate);
  score += scoreByArtists(user, candidate);
  score += scoreBySongs(user, candidate);
  return score;
};

/**
 * Calculate scores for each candidate.
 */
const calculateScores = (user, candidates) =>
  candidates.map((candidate) => {
    const score = scoreByMusic(user, candidate);
    return { candidate, score };
  });

/**
 * Filter candidates based on a minimum score.
 */
const filterByScore = (candidatesWithScores, minScore = 3) =>
  candidatesWithScores
    .filter(({ score }) => score >= minScore) // Early elimination of low scores
    .map(({ candidate }) => candidate);

/**
 * Hard Filter: Filter users by gender and age.
 */
const hardFilter = (user, candidates) =>
  candidates.filter((candidate) => {
    // Filter by gender
    if (!isGenderWithinPreferences(user, candidate)) return false; // Early exit if gender does not match

    // Filter by age
    if (!isAgeWithinPreferences(user, candidate)) return false; // Early exit if age does not match

    return true; // Return true if both conditions are met
  });

/**
 * Main function: Filters a list of candidates based on a user's preferences and scores.
 */
const filterUsers = (user, candidates) => {
  // Step 1: Apply hard filters (gender and age)
  const hardFilteredCandidates = hardFilter(user, candidates);

  // Step 2: Calculate scores for remaining candidates
  const candidatesWithScores = calculateScores(user, hardFilteredCandidates);

  // Step 3: Filter by scores
  return filterByScore(candidatesWithScores);
};

export {
  isGenderWithinPreferences,
  isAgeWithinPreferences,
  scoreByArtists,
  scoreBySongs,
  scoreByGenres,
  scoreByMusic,
  hardFilter,
  calculateScores,
  filterByScore,
  filterUsers,
};

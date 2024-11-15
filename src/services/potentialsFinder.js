/*
Filtering functions for our matching algorithm
*/

// Filter by gender
const filterByGender = (user, candidates) => candidates.filter(candidate => {
    // Case 1: Female user preferring women
    if (user.gender === 'female' && user.preferences.prefer_women && candidate.gender === 'female' && candidate.preferences.prefer_women) {
      return true;
    }
  
    // Case 2: Woman preferring only women excludes men
    if (user.gender === 'female' && user.preferences.prefer_women && candidate.gender === 'female' && candidate.preferences.prefer_women) {
      return true;
    }
  
    // Case 3: Man preferring women matches only women who prefer men
    if (user.gender === 'male' && user.preferences.prefer_women && !user.preferences.prefer_men && candidate.gender === 'female' && candidate.preferences.prefer_men) {
      return true;
    }
  
    // Case 4: Non-binary user preferring women and non-binary people
    if (user.gender === 'enby' && user.preferences.prefer_women && candidate.gender === 'female' && candidate.preferences.prefer_enby) {
      return true;
    }
  
    if (user.gender === 'enby' && user.preferences.prefer_enby && candidate.gender === 'enby' && candidate.preferences.prefer_enby) {
      return true;
    }
  
    return false;
  });
  

// Function to filter users based on age preference
const filterByAge = (user, candidates) => candidates.filter(candidate => candidate.age >= user.age_pref_low && candidate.age <= user.age_pref_high);

// Function to calculate artist score
// TODO:
const scoreByArtists = (user, candidate) => {
    let artistScore = 0;
  
    if (user.artist_1 && candidate.artist_1 === user.artist_1) artistScore += 1;
    if (user.artist_2 && candidate.artist_2 === user.artist_2) artistScore += 1;
    if (user.artist_3 && candidate.artist_3 === user.artist_3) artistScore += 1;
  
    return artistScore;
  };
  
// Function to calculate song score for two users
// TODO:
const scoreBySongs = (user, candidate) => {
    let songScore = 0;

    if (user.song_1 && candidate.song_1 === user.song_1) songScore += 1;
    if (user.song_2 && candidate.song_2 === user.song_2) songScore += 1;
    if (user.song_3 && candidate.song_3 === user.song_3) songScore += 1;

    return songScore;
    };
  
// Function to calculate genre score for two users
// TODO:
const scoreByGenres = (user, candidate) => {
    let genreScore = 0;

    if (user.genre_1 && candidate.genre_1 === user.genre_1) genreScore += 1;
    if (user.genre_2 && candidate.genre_2 === user.genre_2) genreScore += 1;
    if (user.genre_3 && candidate.genre_3 === user.genre_3) genreScore += 1;

    return genreScore;
    };

// Function to calculate total score for two users based on their genres, songs, and artists
// TODO:
const scoreByMusic = (user, candidate) => {
    let score = 0;
    
    // Call helper functions to add to the total score
    score += scoreByGenres(user, candidate);
    score += scoreByArtists(user, candidate);
    score += scoreBySongs(user, candidate);
    
    // Return the total score based on all preferences
    return score;
    };
      

// Hard Filter: Filter users by gender and age
const hardFilter = (user, candidates, ageRange = { min: 18, max: 100 }) => candidates.filter(candidate => {
    // Filter by gender
    const genderMatch = filterByGender(user, candidate);
    if (!genderMatch) return false;

    // Filter by age range
    if (candidate.age < ageRange.min || candidate.age > ageRange.max) return false;

    return true;
});
  
// Calculate scores for each candidate
const calculateScores = (user, candidates) => candidates.map(candidate => ({
    candidate,
    score: scoreByMusic(user, candidate)
}));
  
// TODO: filtering by score
const filterByScore = (candidatesWithScores, minScore = 3) => {
    if (!Array.isArray(candidatesWithScores)) {
        console.error("Expected an array but received:", candidatesWithScores);
    }
    const candidates = Array.from(candidatesWithScores); // Convert if it's not already an array

    return candidates
        .filter(({ score }) => score >= minScore)
        .map(({ candidate }) => candidate);
};


    
// Combine hard filters and score-based filtering
const filterUsers = (user, candidates, options = {}) => {
    const { ageRange = { min: 18, max: 100 }, musicThreshold = 3 } = options;

    // Step 1: Apply hard filters (gender and age)
    const hardFilteredCandidates = hardFilter(user, candidates, ageRange);

    // Step 2: Calculate scores for remaining candidates
    const candidatesWithScores = calculateScores(user, hardFilteredCandidates);

    // Step 3: Filter by scores
    return filterByScore(candidatesWithScores, musicThreshold);
    };



module.exports = { filterByGender, filterByAge, scoreBySongs, scoreByArtists, scoreByGenres, scoreByMusic, filterByScore, filterUsers };

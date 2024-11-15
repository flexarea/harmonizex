const { filterByGender } = require('../services/potentialsFinder');

describe('Gender Preference Matching', () => {
  test('should match a female user who prefers women with other females who prefer women', () => {
    const user = { gender: 'female', preferences: { prefer_women: true } };
    const candidates = [
      { gender: 'female', preferences: { prefer_women: true } },  // Should match
      { gender: 'male', preferences: { prefer_women: true } }     // Should not match
    ];

    const result = filterByGender(user, candidates);

    expect(result).toEqual([candidates[0]]);
  });

  test('should exclude men from a woman who only prefers women', () => {
    const user = { gender: 'female', preferences: { prefer_women: true } };
    const candidates = [
      { gender: 'male', preferences: { prefer_men: true } },   // Should not match
      { gender: 'female', preferences: { prefer_women: true } } // Should match
    ];

    const result = filterByGender(user, candidates);

    expect(result).toEqual([candidates[1]]);
  });

  test('should match a man who prefers women with women who also prefer men', () => {
    const user = { gender: 'male', preferences: { prefer_men: false, prefer_women: true } };
    const candidates = [
      { gender: 'female', preferences: { prefer_men: true } },  // Should match
      { gender: 'female', preferences: { prefer_women: true } }, // Should not match
      { gender: 'male', preferences: { prefer_men: true } }     // Should not match
    ];

    const result = filterByGender(user, candidates);

    expect(result).toEqual([candidates[0]]);
  });

  test('should match a non-binary user who prefers women and non-binary people', () => {
    const user = { gender: 'enby', preferences: { prefer_enby: true, prefer_women: true } };
    const candidates = [
      { gender: 'female', preferences: { prefer_enby: true } },  // Should match
      { gender: 'enby', preferences: { prefer_enby: true } }     // Should match
    ];

    const result = filterByGender(user, candidates);

    expect(result).toEqual(candidates);
  });
});

import { isGenderWithinPreferences } from "../services/candidatesFinder";

describe("Gender Preference Matching", () => {
  test("should match a female user who prefers women with other females who prefer women", () => {
    const user = { gender: "female", preferences: { prefer_women: true } };
    const candidates = [
      { gender: "female", preferences: { prefer_women: true } }, // Should match
      { gender: "male", preferences: { prefer_women: true } }, // Should not match
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    ); // Test each candidate

    expect(result).toEqual([candidates[0]]);
  });

  test("should exclude men from a woman who only prefers women", () => {
    const user = { gender: "female", preferences: { prefer_women: true } };
    const candidates = [
      { gender: "male", preferences: { prefer_men: true } }, // Should not match
      { gender: "female", preferences: { prefer_women: true } }, // Should match
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );

    expect(result).toEqual([candidates[1]]);
  });

  test("should match a man who prefers women with women who also prefer men", () => {
    const user = {
      gender: "male",
      preferences: { prefer_men: false, prefer_women: true },
    };
    const candidates = [
      { gender: "female", preferences: { prefer_men: true } }, // Should match
      { gender: "female", preferences: { prefer_women: true } }, // Should not match
      { gender: "male", preferences: { prefer_men: true } }, // Should not match
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );

    expect(result).toEqual([candidates[0]]);
  });

  test("should match a non-binary user who prefers women and non-binary people", () => {
    const user = {
      gender: "enby",
      preferences: { prefer_enby: true, prefer_women: true },
    };
    const candidates = [
      { gender: "female", preferences: { prefer_enby: true } }, // Should match
      { gender: "enby", preferences: { prefer_enby: true } }, // Should match
      { gender: "male", preferences: { prefer_enby: true } }, // Should not match
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );

    expect(result).toEqual(candidates.slice(0, 2)); // The first two candidates should match
  });

  test("should not match a user with no gender preferences to any candidates", () => {
    const user = {
      gender: "female",
      preferences: {
        prefer_women: false,
        prefer_men: false,
        prefer_enby: false,
      },
    };
    const candidates = [
      { gender: "female", preferences: { prefer_women: true } },
      { gender: "male", preferences: { prefer_men: true } },
      { gender: "enby", preferences: { prefer_enby: true } },
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );
    // Since the user doesn't have preferences, they should not match any candidates
    expect(result).toEqual([]);
  });

  test("should not match a user with contradictory preferences to any candidates", () => {
    const user = {
      gender: "female",
      preferences: { prefer_women: true, prefer_men: false },
    };
    const candidates = [
      { gender: "female", preferences: { prefer_women: true } }, // Should match
      { gender: "male", preferences: { prefer_men: true } }, // Should not match, user excludes men
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );
    expect(result).toEqual([candidates[0]]);
  });

  test("should match a user who prefers all genders with all candidates", () => {
    const user = {
      gender: "female",
      preferences: { prefer_women: true, prefer_men: true, prefer_enby: true },
    };
    const candidates = [
      { gender: "female", preferences: { prefer_women: true } }, // Should match
      { gender: "male", preferences: { prefer_men: true } }, // Should match
      { gender: "enby", preferences: { prefer_enby: true } }, // Should match
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );
    expect(result).toEqual(candidates); // All candidates should match
  });

  test("should exclude candidates whose gender does not match preferences, even if they match user's gender preference", () => {
    const user = { gender: "female", preferences: { prefer_women: true } };
    const candidates = [
      { gender: "female", preferences: { prefer_women: false } }, // Should not match, prefers no women
      { gender: "male", preferences: { prefer_men: true } }, // Should not match, excludes men
    ];

    const result = candidates.filter((candidate) =>
      isGenderWithinPreferences(user, candidate),
    );
    expect(result).toEqual([]); // No candidates should match
  });
});

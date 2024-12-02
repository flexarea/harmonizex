import { isAgeWithinPreferences } from "../services/candidatesFinder";

describe("Age Preference Matching", () => {
  test("should match users within the same age range", () => {
    const user = { age_pref_low: 20, age_pref_high: 30 };
    const candidates = [{ age: 25 }, { age: 35 }, { age: 22 }];

    const result = candidates.filter((candidate) =>
      isAgeWithinPreferences(user, candidate),
    );

    expect(result).toEqual([candidates[0], candidates[2]]);
  });

  test("should exclude users whose age is outside the preferred range", () => {
    const user = { age_pref_low: 30, age_pref_high: 40 };
    const candidates = [{ age: 35 }, { age: 22 }, { age: 40 }];

    const result = candidates.filter((candidate) =>
      isAgeWithinPreferences(user, candidate),
    );

    expect(result).toEqual([candidates[0], candidates[2]]);
  });

  test("should not match users outside the upper bound of the preferred age range", () => {
    const user = { age_pref_low: 25, age_pref_high: 30 };
    const candidates = [{ age: 40 }, { age: 28 }];

    const result = candidates.filter((candidate) =>
      isAgeWithinPreferences(user, candidate),
    );

    expect(result).toEqual([candidates[1]]);
  });

  test("should not match users below the lower bound of the preferred age range", () => {
    const user = { age_pref_low: 30, age_pref_high: 40 };
    const candidates = [{ age: 22 }, { age: 35 }];

    const result = candidates.filter((candidate) =>
      isAgeWithinPreferences(user, candidate),
    );

    expect(result).toEqual([candidates[1]]);
  });
});

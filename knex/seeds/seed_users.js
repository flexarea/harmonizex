/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'John Doe',
      age: 25,
      gender: 'male',
      prefer_men: true,
      prefer_women: false,
      prefer_enby: false,
    },
    {
      name: 'Jane Smith',
      age: 28,
      gender: 'female',
      prefer_men: false,
      prefer_women: true,
      prefer_enby: false,
    },
    {
      name: 'Alex Taylor',
      age: 30,
      gender: 'nonbinary',
      prefer_men: false,
      prefer_women: false,
      prefer_enby: true,
    },
  ]);
};

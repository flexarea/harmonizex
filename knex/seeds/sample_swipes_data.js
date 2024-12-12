const interactions = [
    {
      user_id: 1,
      likes: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 2,
      likes: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 3,
      likes: [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 4,
      likes: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 5,
      likes: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 6,
      likes: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 7,
      likes: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
    {
      user_id: 8,
      likes: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15],
      dislikes: [],
    },
  ];
  
  exports.seed = async function(knex) {
    await knex("interactions").del();
    await knex("interactions").insert(interactions);
  };
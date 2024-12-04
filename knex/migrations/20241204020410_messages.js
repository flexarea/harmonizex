// migrations/XXXX_create_messages_table.js

exports.up = function (knex) {
  return knex.schema.createTable('messages', function (table) {
    table.increments('message_id').primary();
    table.integer('sender_id').notNullable();
    table.integer('receiver_id').notNullable();
    table.text('content').notNullable();
    table.timestamp('timestamp').defaultTo(knex.fn.now());

    table
      .foreign('sender_id')
      .references('user_id')
      .inTable('user_data')
      .onDelete('CASCADE');
    table
      .foreign('receiver_id')
      .references('user_id')
      .inTable('user_data')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('messages');
};

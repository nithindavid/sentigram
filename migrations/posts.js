
exports.up = function(knex) {
  return knex.schema
    .createTable('posts', function(table) {
      table.increments('id').primary();
      table.string('content');
      table.integer('user_id').references('user.id');
      table.timestamps();
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('posts');
};
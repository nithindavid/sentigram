
exports.up = function(knex) {
  return knex.schema
    .createTable('follows', function(table) {
      table.increments('id').primary();
      table.integer('follower_id').references('user.id');
      table.integer('user_id').references('user.id');
      table.unique(['user_id', 'follower_id']);
      table.timestamps();
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('follows');
};
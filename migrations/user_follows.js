
exports.up = function(knex) {
  return knex.schema
    .createTable('user_follows', function(table) {
      table.increments('key_id').primary();
      table.integer('follower_id').references('user.id');
      table.integer('followee_id').references('user.id');
      table.unique(['followee_id', 'follower_id']);
      table.timestamps();
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('user_follows');
};
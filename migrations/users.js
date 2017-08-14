
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('username').unique();
      table.string('password');
      table.string('photo_url');
    });
};
exports.down = function(knex) {
  return knex.schema
    .dropTable('users');
};
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(table){
    table.increments();
    table.string('date');
    table.string('focus');
    table.integer('user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sessions');
};

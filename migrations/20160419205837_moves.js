exports.up = function(knex, Promise) {
  return knex.schema.createTable('moves', function(table){
    table.increments();
    table.string('name');
    table.string('class');
    table.string('description');
    table.string('picture');
    table.string('url');
    table.integer('difficulty');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('moves');
};

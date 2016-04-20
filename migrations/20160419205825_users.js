exports.up = function(knex, Promise) {
 return knex.schema.createTable('users', function(t){
   t.string('facebook_id').unique();
   t.string('email');
   t.string('first_name');
   t.string('last_name');
   t.string('name');
   t.string('profile_image_url');
   t.timestamps();
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('users');
}

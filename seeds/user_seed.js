
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({
      facebook_id: 'Patrick W. Dullano',
      email: 'PWDullano@gmail.com',
      first_name: 'Patrick',
      last_name: 'Dullano',
      name: 'Patrick Dullano'})
  );
};

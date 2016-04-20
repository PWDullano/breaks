exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('sessions').del(),

    // Inserts seed entries
    knex('sessions').insert({
      id: 30,
      date: '4/12/2016',
      focus: "Windmill , 2000 , Baby Freeze , Freezes, Flares, Airflares",
      user_id: 1}),
    knex('sessions').insert({
      id: 31,
      date: '4/14/2016',
      focus: "Top Rock, Drops, Six-Step, Baby Swipes, Swipes , Windmill, Freezes",
      user_id: 1})
  );
};

exports.seed = function (knex, Promise) {
  return knex('events').del()
    .then(() => knex('users').del())
    .then(() => {
      return knex('users')
        .returning('id')
        .insert([
          { id: 1, name: 'Alice', email: 'alice@alice.alice' },
          { id: 2, name: 'Bob', email: 'bob@bob.bob' },
          { id: 3, name: 'Charlie', email: 'charlie@charlie.charlie' }
        ]);
    })
    .then(([alice, bob, charlie]) => {
      return knex('events')
        .insert([
          {
            hash_id: '0cc175b9c0f1b6a831c399e269772661',
            title: 'red',
            description: 'Color of red',
            organizer_id: alice
          },
          {
            hash_id: '92eb5ffee6ae2fec3ad71c777531578f',
            title: 'green',
            description: 'Color of green',
            organizer_id: alice
          },
          {
            hash_id: '4a8a08f09d37b73795649038408b5f33',
            title: 'blue',
            description: 'Color of blue',
            organizer_id: bob
          }
        ])
      // Generate Events
    })
};

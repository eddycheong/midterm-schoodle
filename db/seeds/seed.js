exports.seed = function (knex, Promise) {
  return knex('user_event_availability').del()
    .then(() => knex('event_dates').del())
    .then(() => knex('events').del())
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
        .returning('hash_id')
        .insert([
          {
            hash_id: '60b725f10c9c85c70d97880dfe8191b3',
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
    })
    .then(([red, green, blue]) => {
      return knex('event_dates')
        .returning('id')
        .insert([
          {
            id: 1,
            date: '2017-01-08',
            event_id: red
          },
          {
            id: 2,
            date: '2017-02-08',
            event_id: red
          },
          {
            id: 3,
            date: '2017-03-22',
            event_id: blue
          }
        ])
    })
    .then(([jan, feb, mar]) => {
      return knex('user_event_availability')
        .insert([
          {
            event_date_id: jan,
            attendee_id: 1,
            event_date_response: true
          },
          {
            event_date_id: feb,
            attendee_id: 2,
            event_date_response: true
          },
          {
            event_date_id: jan,
            attendee_id: 3,
            event_date_response: false
          }
        ])
    })
};

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
            title: 'full',
            description: 'Event with all attendees',
            organizer_id: alice
          },
          {
            hash_id: '92eb5ffee6ae2fec3ad71c777531578f',
            title: 'one',
            description: 'Event with one attendee',
            organizer_id: alice
          },
          {
            hash_id: '4a8a08f09d37b73795649038408b5f33',
            title: 'empty',
            description: 'Event with no attendee',
            organizer_id: bob
          }
        ])
    })
    .then(([full, one, empty]) => {
      return knex('event_dates')
        .returning('id')
        .insert([
          {
            id: 1,
            date: '2017-01-01',
            event_id: full
          },
          {
            id: 2,
            date: '2017-01-02',
            event_id: full
          },
          {
            id: 3,
            date: '2017-04-04',
            event_id: one
          },
          {
            id: 4,
            date: '2017-04-05',
            event_id: one
          },
          {
            id: 5,
            date: '2017-04-09',
            event_id: one
          },
          {
            id: 6,
            date: '2017-04-10',
            event_id: one
          },
          {
            id: 7,
            date: '2017-04-11',
            event_id: one
          },
          {
            id: 8,
            date: '2017-02-20',
            event_id: empty
          },
          {
            id: 9,
            date: '2017-02-22',
            event_id: empty
          },
          {
            id: 10,
            date: '2017-02-27',
            event_id: empty
          }
        ])
    })
    .then(eventDateOpts => {
      return knex('user_event_availability')
        .insert([
          {
            event_date_id: eventDateOpts[0],
            attendee_id: 1,
            event_date_response: false
          },
          {
            event_date_id: eventDateOpts[1],
            attendee_id: 1,
            event_date_response: true
          },
          {
            event_date_id: eventDateOpts[0],
            attendee_id: 2,
            event_date_response: true
          },
          {
            event_date_id: eventDateOpts[1],
            attendee_id: 2,
            event_date_response: true
          },          
          {
            event_date_id: eventDateOpts[0],
            attendee_id: 3,
            event_date_response: false
          },
          {
            event_date_id: eventDateOpts[1],
            attendee_id: 3,
            event_date_response: false
          },
          {
            event_date_id: eventDateOpts[2],
            attendee_id: 3,
            event_date_response: false
          },
          {
            event_date_id: eventDateOpts[3],
            attendee_id: 3,
            event_date_response: false
          },
          {
            event_date_id: eventDateOpts[4],
            attendee_id: 3,
            event_date_response: false
          },
          {
            event_date_id: eventDateOpts[5],
            attendee_id: 3,
            event_date_response: true
          },
          {
            event_date_id: eventDateOpts[6],
            attendee_id: 3,
            event_date_response: true
          }
        ])
    })
};

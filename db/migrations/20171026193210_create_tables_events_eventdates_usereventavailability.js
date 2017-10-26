
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('events', table => {
            table.string('hash_id');
            table.primary('hash_id');
            table.string('title');
            table.text('description');
            table.integer('organizer_id').references('id').inTable('users');
        }),
        knex.schema.createTable('event_dates', table => {
            table.increments();
            table.date('date');
            table.string('event_id').references('hash_id').inTable('events');
        }),
        knex.schema.createTable('user_event_availability', table => {
            table.integer('event_date_id').references('id').inTable('event_dates');
            table.integer('attendee_id').references('id').inTable('users');
            table.boolean('event_date_response');
            table.primary(['event_date_id','attendee_id']);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('user_event_availability'),
        knex.schema.dropTable('event_dates'),
        knex.schema.dropTable('events')
    ]);
};

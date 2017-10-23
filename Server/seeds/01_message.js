let messages = require('../seed_data/message_seed')
messages = messages.map(m => {
  m.labels = JSON.stringify(m.labels)
  return m;
})

exports.seed = function(knex, Promise) {
  return knex('message').del()
    .then(function () {
      return knex('message').insert(messages);
    });
};

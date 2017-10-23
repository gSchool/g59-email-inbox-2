//pulls in the knex.js file found in db
const knex = require('./knex')

module.exports = {
  getAll() {
    return knex('message');
  },
  getOne(id) {
    return knex('message').where('id', id).first();
  },
  create(message) {
    return knex('message').insert(message, '*');
  },
  update(id, messageDetails) {
    return knex('message').where('id', id).update(messageDetails, '*');
  },
  delete(id) {
    return knex('message').where('d', id).del();
  }
}

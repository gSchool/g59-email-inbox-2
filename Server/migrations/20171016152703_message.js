
exports.up = function(knex, Promise) {
  return knex.schema.createTable('message', (table => {
    table.increments('id').primary()
    table.text("subject")
    table.text("body")
    table.boolean("read")
    table.boolean("starred")
    table.boolean("selected")
    table.text("labels")
  }))
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('message')
};

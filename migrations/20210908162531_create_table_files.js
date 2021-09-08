
exports.up = async knex => {
  knex.schema.createTable('files', t => {
    t.increments();
    t.string('qbittorent_id').notNullable().defaultTo('');
    t.string('name').notNullable().defaultTo('');
  });
};

exports.down = async knex => {
  knex.schema.dropTable('files');
};

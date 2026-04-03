export const up = function(knex) {
  return knex.schema.createTable('site_settings', table => {
    table.increments('id').primary();
    table.string('key').unique().notNullable();
    table.jsonb('value');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = function(knex) {
  return knex.schema.dropTableIfExists('site_settings');
};

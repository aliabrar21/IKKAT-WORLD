export const up = async (knex) => {
    await knex.schema.table('users', (table) => {
        table.boolean('is_verified').defaultTo(false);
    });

    await knex.schema.createTable('otps', (table) => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('otp_code').notNullable();
        table.string('type').notNullable();
        table.timestamp('expires_at').notNullable();
        table.integer('attempts').defaultTo(0);
        table.timestamps(true, true);
    });
};

export const down = async (knex) => {
    await knex.schema.dropTableIfExists('otps');
    await knex.schema.table('users', (table) => {
        table.dropColumn('is_verified');
    });
};

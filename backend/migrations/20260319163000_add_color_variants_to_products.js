/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.alterTable('products', (table) => {
        table.string('group_id').index();
        table.string('color_name');
        table.string('color_code');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.alterTable('products', (table) => {
        table.dropColumn('group_id');
        table.dropColumn('color_name');
        table.dropColumn('color_code');
    });
};

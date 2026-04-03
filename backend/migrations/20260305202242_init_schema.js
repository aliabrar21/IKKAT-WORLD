/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('role').defaultTo('ADMIN');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('categories', (table) => {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
        table.timestamps(true, true);
    });

    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('sku').unique().notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.string('imageUrl');
        table.specificType('images', 'text ARRAY');
        table.string('availability').defaultTo('Available');
        table.text('fabricDetails');
        table.string('length');
        table.string('blousePieceInfo');
        table.string('deliveryTime');
        table.text('careInstructions');
        table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('customers', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('phone');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('orders', (table) => {
        table.increments('id').primary();
        table.integer('customer_id').unsigned().references('id').inTable('customers').onDelete('CASCADE');
        table.decimal('totalAmount', 10, 2).notNullable();
        table.string('status').defaultTo('Pending');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('order_items', (table) => {
        table.increments('id').primary();
        table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
        table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
        table.integer('quantity').defaultTo(1);
        table.decimal('price', 10, 2).notNullable();
    });

    await knex.schema.createTable('custom_orders', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.string('sareeType').notNullable();
        table.string('colorPreference').notNullable();
        table.text('message');
        table.string('status').defaultTo('Pending');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('messages', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phone');
        table.text('content').notNullable();
        table.boolean('isRead').defaultTo(false);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.dropTableIfExists('messages');
    await knex.schema.dropTableIfExists('custom_orders');
    await knex.schema.dropTableIfExists('order_items');
    await knex.schema.dropTableIfExists('orders');
    await knex.schema.dropTableIfExists('customers');
    await knex.schema.dropTableIfExists('products');
    await knex.schema.dropTableIfExists('categories');
    await knex.schema.dropTableIfExists('users');
};

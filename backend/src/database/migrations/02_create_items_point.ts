import Knex from 'knex';

export async function up(knex:Knex){
    return knex.schema.createTable('items_point', item_point => {
        item_point.increments('id').primary();
        item_point.integer('id_point').notNullable();
        item_point.integer('id_item').notNullable();

    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('items_point');
}
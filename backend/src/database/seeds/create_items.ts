import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('items').insert([

        {title: "Roupas", image: 'clothing.png'},
        {title: "alimentos", image: 'supermarket.png'},
        {title: "Brinquedos", image: 'puzzle.png'},
        {title: "Livros", image: "book.png"},
        {title: "Dinheiro", image: "money.png"},
   
    ])
}
import { Request, Response } from 'express';
import knex from '../database/connection';

class Items{
    async index(request: Request , response: Response){
        const items = await knex('items').select('*');
        
        if(!items){
            return response.status(502).json({message: "Internal Server error!"})
        }

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/tmp/${item.image}`
            }     
        })

        return response.json(serializedItems);
    }
}

export default Items;
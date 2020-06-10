import knex from '../database/connection';
import { Request, Response }  from 'express';

class Points{

    async create(request: Request , response: Response){
        const { title, city, uf, email, whatsapp, longitude, latitude, items } = request.body;

        const trx = await knex.transaction();

        const dataPoint = {
            image: 'https://unsplash.com/photos/BVLVJ6YErSc',
            title, city, uf, email, whatsapp, longitude, latitude,
        }

        const point = await trx('points').insert(dataPoint);

        const items_point = items.map((item : number) => {
            return {
                id_item: item,
                id_point: point[0],
            }
        });

        await trx('items_point').insert(items_point);

        await trx.commit();

        return response.json({point: point[0], ...dataPoint, items });

    }
}

export default Points;

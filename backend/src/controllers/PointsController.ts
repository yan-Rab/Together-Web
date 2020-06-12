import knex from '../database/connection';
import { Request, Response }  from 'express';

class Points{

    async create(request: Request , response: Response){
        const {title, city, uf, email, whatsapp, longitude, latitude, items } = request.body;

        const trx = await knex.transaction();
      
        const dataPoint = {
            image : request.file.filename, 
            title, city, uf, email, whatsapp, longitude, latitude,
        }

        const point = await trx('points').insert(dataPoint);

        const items_point = items.split(',').map((item: string) => Number(item.trim())).map((item_id:number) => {
            return {
                id_item: item_id,
                id_point: point[0]
            }
        })

        await trx('items_point').insert(items_point);

        await trx.commit();

        return response.json({point: point[0], ...dataPoint, items });

    }
}

export default Points;

import knex from '../database/connection';
import { Request, Response }  from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../auth/Auth';

function generateToken(props: {}){
    return jwt.sign(props,Auth.secret, {
         expiresIn: 86400
     } )
 }
class Points{

    


    async create(request: Request , response: Response){
        const {title, city, uf, email, whatsapp, longitude, latitude, items, hash} = request.body;

        const trx = await knex.transaction();

        const image = request.file.filename;
        const password = await bcrypt.hash(hash, 10);

        const dataPoint = {
            password,
            image,
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
      
        return response.send({point: point[0], ...dataPoint, token: generateToken({id: point[0]}) ,items });

    }

   
}

export default Points;

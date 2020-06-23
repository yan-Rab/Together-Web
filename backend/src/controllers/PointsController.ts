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

 interface ResponseAuth {
     id: number,
     password: string,
 }

 interface Points{
     image: string,
     title: string,
     email:  string,
     latitude: number,
     longitude: number,
     whatsapp: string,
     city: string,
     uf: string,
 }

 interface Items{
     id: number,
     title: string,
     image: string
 }
class Points{


    async show(request: Request, response: Response){
        const {id} = request.params;

        const point = await knex.select('*').from<Points>('points').where('id', id).first();
        const items = await knex('items').join('items_point', 'items.id','=','items_point.id_item')
        .where('items_point.id_point', id).select('*');

        const serializedItems = items.map((item: Items) => {
            return{
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/tmp/${item.image}`
            }
        })
        const image_uri = `http://localhost:3333/tmp/uploads/${point?.image}`;
        const dataPoint = {
            point,
            serializedItems,
            image_uri
        }
        return response.json(dataPoint);

    }


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
      
        return response.send({point: point[0], dataPoint , token: generateToken({id: point[0]}) ,items });

    }

    async authentication(request: Request,response: Response){
        const {email, password} = request.body;

        const points = await knex<ResponseAuth>('points').select('*').where("email", email).first();
        
        if(!points){
            return response.status(400).json({message: 'Point not found!'})
        }
        
        if(!await bcrypt.compare(password, points.password)){
            return response.status(400).json({message: 'Invalid password!'})
        }
        const point = points.id;
        const token = generateToken({id: points.id});
        return response.json({message: 'Entrando...',point, token});
    }

    async updateInforsPrimary(request: Request, response: Response){
        const {title, id} = request.body;
        const image = request.file.filename;
        
         await knex('points').where('id', id)
        .update('title', title)
        .update('image', image);

        
    }

    async updateInforsSecundary(request: Request, response: Response){
        const {email, whatsapp, city, uf, id} = request.body;
        await knex('points').where('id',id)
        .update('email',email)
        .update('whatsapp', whatsapp)
        .update('city', city)
        .update('uf',uf);
      
    }

    async updatePointLocation(request: Request, response: Response){
        const {latitude, longitude, id} = request.body;
        await knex('points').where('id',id)
        .update('latitude', latitude)
        .update('longitude', longitude);

    }

    async updatePointItems(request: Request, response: Response){
        const {items, id} = request.body;
        
        const serializedItems = items.map((item: number) => {
            return{
                id_point: id,
                id_item: item
            }
        })

        await knex('items_point').where("id_point", id).delete('*');
        await knex('items_point').insert(serializedItems);

    }

   
}

export default Points;

import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response} from 'express'
import Auth from '../auth/Auth';

function authMiddle (request: Request,response: Response,next: NextFunction){
    const AuthHeader = request.headers.authorization;

    if(!AuthHeader){
        return response.status(404).json({message: 'No token Provided!'})
    }

    const parts = AuthHeader.split(' ');

    if(parts.length != 2){
        return response.status(404).json({message: 'Token Error'})
    }

    const [bearer, token] = parts;

    if(!/^bearer$/i.test(bearer)){
        return response.status(404).json({message: 'Token malformated!'})
    }

    jwt.verify(token, Auth.secret, (decode, error) => {
        if(error){
            return response.status(404).json({message: 'Invalid Token'})
        }

        return next();
       
    } )
}

export default authMiddle;
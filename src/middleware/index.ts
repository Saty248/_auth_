import express from 'express';
import { verify } from 'jsonwebtoken';
import { get, merge } from 'lodash';


export const m1=(req:express.Request,res:express.Response ,next:express.NextFunction)=>{
    console.log("m1 is working -----------------")
    merge(req, { identity: "hello" })
    return next();
}
export const isAuth=(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) throw new Error('You need to login.');
        // Based on 'Bearer ksfljrewori384328289398432'
        const token = authorization.split(' ')[1];
        const ans = verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(ans)
        merge(req,{ans})
    } catch (error) {
        console.log(error)
        
    }
        
        
      
    next();
}
import { sign } from "jsonwebtoken";
import express from 'express';

export const createAccessToken=async(userId:number)=>{
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });

}
export const createRefreshToken = (userId:number) => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });
  };
export  const sendAccessToken = (req:express.Request, res:express.Response, accesstoken:string | Promise<string>) => {
    console.log(accesstoken)
    res.json({
      accesstoken,
      email: req.body.email,
    });
  };

export  const sendRefreshToken = (res:express.Response, token:string) => {
    res.cookie('refreshtoken', token, {
      httpOnly: true,
      path: '/refresh_token',
    });
  };
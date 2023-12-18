import { verify } from 'jsonwebtoken';
import  express  from 'express';
import "dotenv/config"
import DB from '../db';
import { hash,compare } from 'bcrypt';
import { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } from '../utils/tokens';



export const handleRegister=async (req:express.Request,res:express.Response)=>{
    try {
        
        let resp={...req.body}

    let user={
        id:DB.length,
    email:resp.email,
    password:resp.password
    }
     
    
    let ans=DB.find(user2=>{
       if(user2.email==user.email){
        return true;
       }else{
        return false;
       }
    })

    if(ans){
        res.status(400).json({"message":"already registered","user":user.email})
    }else{
        user.id=DB.length;
        user.password=await hash(user.password,10)
        DB.push(user);
        res.status(200).json({"message":"registered","user":user.email});

    }
    
    
   
    } catch (error) {
        console.log(error)
    }

    
}

export const handleLogin=async(req:express.Request,res:express.Response)=>{
try {

    
     const user =DB.find(user=>user.email===req.body.email)
    if (!user) throw new Error('User does not exist');
   
        const valid = await compare(req.body.password, user.password);
        if (!valid) throw new Error('Password not correct');

        const accessToken=createAccessToken(user.id)
        const refreshToken=createRefreshToken(user.id)
        user.refreshToken=refreshToken;
        sendRefreshToken(res,refreshToken)
        sendAccessToken(req,res,accessToken) 
    

} catch (error) {
    res.send({
        error: `${error.message}`,
      });
    
}
  


}

export const handleLogout= (req:express.Request, res:express.Response) => {
    res.clearCookie('refreshtoken');
    // Logic here for also remove refreshtoken from db
     res.send({
      message: 'Logged out',
    });
  }

  export const refresh_token=(req:express.Request, res:express.Response) => {
    const token = req.cookies.refreshtoken;
    // If we don't have a token in our request
    if (!token) return res.send({ accesstoken: '' });
    // We have a token, let's verify it!
    let payload:any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.send({ accesstoken: '' });
    }
    // token is valid, check if user exist
    const user = DB.find(user => user.id === payload.userId);
    if (!user) return res.send({ accesstoken: '' });
    // user exist, check if refreshtoken exist on user
    if (user.refreshToken !== token)
      return res.send({ accesstoken: '' });
    // token exist, create new Refresh- and accesstoken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    user.refreshToken = refreshtoken;
    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
  };


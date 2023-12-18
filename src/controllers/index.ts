import  express  from 'express';
import "dotenv/config"
import { get } from 'lodash';




export const working=async (req:express.Request,res:express.Response)=>{
    const currentUserId = get(req, 'identity') as string;
    console.log(currentUserId)
    res.status(200).json({

        msg:"working"
    })
}
export const handleProtected=async (req:express.Request,res:express.Response)=>{
    try {
        const userId:any = get(req,'ans')
        if (userId !== null) {
          res.json({
            user:userId,
            data: 'This is protected data.',
          });
        }
      } catch (err) {
        res.send({
          error: `${err.message}`,
        });
      }
}


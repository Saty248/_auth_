import express from "express"


import {handleProtected, working} from "../controllers"

import { m1 } from "../middleware";

import authentication from "./authentication";


import { isAuth } from '../middleware/index';

const router = express.Router();
export default (): express.Router=>{
   
   
   
   
    router.get('/',m1,working);
   authentication(router)
   router.post('/protected',isAuth,handleProtected)
   
   
   
    return router;
}
import { FastifyPluginAsync } from "fastify"
import {  
  createUser, 
  getUserById,
  userSignin
} from "../../controllers/user/index";


const User: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
 
  createUser(fastify);
  getUserById(fastify);
  userSignin(fastify);
  
}

export default User;
import { FastifyPluginAsync } from "fastify"
import {  
  createPost,
  getPostById
} from "../../controllers/post/index";
import { AuthHook } from "../../fastify-hooks/auth.hook";


const User: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
 
  fastify.addHook("onRequest", AuthHook(fastify));

  createPost(fastify);
  getPostById(fastify);
  
}

export default User;
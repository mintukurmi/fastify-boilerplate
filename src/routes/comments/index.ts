import { FastifyPluginAsync } from "fastify"
import {  
  createComment,
  getAllComments
} from "../../controllers/comment/index";
import { AuthHook } from "../../fastify-hooks/auth.hook";


const User: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
 
  fastify.addHook("onRequest", AuthHook(fastify));

  createComment(fastify);
  getAllComments(fastify);
  
}

export default User;
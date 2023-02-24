import { FastifyInstance } from "fastify";

interface ICreateComment {
    content: string;
    post: number;
    fastify: FastifyInstance
}

interface IGetComment { fastify: FastifyInstance }

export const createCommentService = async ({ post, content, fastify}: ICreateComment) => {

    const comment = await fastify.prisma.comment.create({
        data: {
            content,
            author: 69,
            post
        }
    })

    return comment;
}

export const getAllCommentsService = async ({ fastify }: IGetComment) => {

    const comments = await fastify.prisma.comment.findMany();
    return  comments;
} 
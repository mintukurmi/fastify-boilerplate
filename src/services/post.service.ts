import { Post } from "../models/Post.model";
import { Response } from "../utils/http-response.utils";

interface ICreatePost {
    title: string;
    description: string
}

interface IGetPost {
    postId: string
}

export const createPostService = async (payload: ICreatePost) => {
    
    if(payload.title === "" || payload.description === "") {
        throw new Response().badRequest("Title/Description can't be empty")
    }

    const post = await Post.create({
        title: payload.title,
        description: payload.description
    })

    return post;
}


export const getPostByIdService = async (params: IGetPost) => {

    const post = await Post.findById(params.postId);

    if(!post) {
        throw new Response().notFound("Post not found")
    }

    return post;
}
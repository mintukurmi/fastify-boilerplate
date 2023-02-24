/**   This file consists of all of the services or handler functions for the current resource   */

import { Types } from "mongoose";
import { User } from "../models/User.model";
import { Response } from "../utils/http-response.utils";
import { compare, hash } from "bcryptjs";
import { jwtSigner } from "../utils/jwt.utils";
import "dotenv/config";
import { tokenTypes } from "../utils/constants.utils";

const ACCESS_TOKEN_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY);

/** Interfaces used in the file are being define here */
interface ICreateUser {
    email: string;
    phone: string;
    password: string;
    name: {
        firstname: string,
        lastname: string
    }
}

interface IGetUserByID {
    userId: string;
} 

interface ILoginData {
    loginId: string;
    password: string;
}

export const createUserService = async (payload: ICreateUser) => {
    
    const userExists = await User.findOne({
        $or: [
            { phone: payload.phone },
            { email: payload.email }
        ]
    })

    if(userExists) {
        throw new Response().notAcceptable("Email/Phone already in use");
    }

    const hashedPassword = await hash(payload.password, 8);

    return await User.create({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: hashedPassword
    })
}

export const getUserByIdService = async (payload: IGetUserByID) => {

    if(!Types.ObjectId.isValid(payload.userId)) {
        throw new Response().badRequest("Invalid User ID");
    }
    
    const user = await User.findById(payload.userId);

    if(!user) {
        throw new Response().notFound("User not found");
    }

    return user;
}

export const userSigninService = async (payload: ILoginData) => {

    const user= await User.findOne({
        $or: [
            { phone: payload.loginId },
            { email: payload.loginId }
        ]
    }) 

    if(!user) {
        throw new Response().notFound("User not found");
    }

    const verifyPass = await compare(payload.password, user.password);

    if(!verifyPass) {
        throw new Response().unAuthorized("Invalid credentials");
    }

    const token = jwtSigner({ payload: { _id: user._id.toString(), type: tokenTypes.access_token }, expiresIn: (1000 * 60) * ACCESS_TOKEN_EXPIRY });

    return { access_token: token }
}
import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./User.model";

export interface IPost extends Document {
    
    title: string;
    description: string;
    creator: Types.ObjectId | IUser;
    likes: Types.ObjectId[] | IUser[];
}

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        default: null
    },
    creator: {
        type: Types.ObjectId,
        ref: "User"
    },
    likes: [{
        type: Types.ObjectId,
        ref: "User"
    }],
    
}, {
    timestamps: true
});

export const Post = model<IPost>("Post", postSchema);
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: {
        firstname: string;
        lastname: string;
    },
    avatar?: string;
    email: string;
    phone: string;
    password: string;
    last_access: string;
    is_blocked: boolean;
}

const userSchema = new Schema({
    name: { 
        firstname: {
            type: String,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        }
    },
    avatar: {
        type: String,
        default: null
    },
    email: { 
        type: String,
        trim: true,
        index: true
    },
    phone: {
        type: String, 
        required: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    is_blocked: {
        type: Boolean,
        default: false
    },
    last_access: Date,
    
}, {
    timestamps: true
});

userSchema.index({ phone: "text" , email: "text" })

export const User = model<IUser>("User", userSchema);
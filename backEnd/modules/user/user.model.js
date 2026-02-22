import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email non valida'],
        lowercase:true,
        trim:true

    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'PatnerPro'],
        default: 'user'
    }


},{timestamps:true});

export default model('User',userSchema)
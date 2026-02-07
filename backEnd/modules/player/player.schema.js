import mongoose from 'mongoose'


const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        enum: ['POR', 'DIF', 'CEN', 'ATT'],
        required: true
    },
    vote: {
        type: Number,
        min: 1,
        max: 10,
        required:true
    },

    description: {
        type: String,
    },
    nationality : {
        type : String,
        required : false
    },
    foot : {
        type : String,
        enum: ['DESTRO','SINISTRO','AMBIDESTRO'],
        required:false
    },
    height: {
        type : Number,
        required:false

    },
    weight:{
        type: Number,
        required:false
    },
    avatar:{
        type: String,
    }


},{timestamps : true});

export default mongoose.model('player',playerSchema,'players')
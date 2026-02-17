
import {Schema,model} from 'mongoose';


const playerSchema = new Schema(
    {
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
        required : false
    },
    team:{
        type: String,
        required: false
    },
    rating:{
        type: Number,
        required: true,
        min:1,
        max:10
    }


},{ timestamps: true,
    collection: 'players', 
  }
);



export default model('player',playerSchema)
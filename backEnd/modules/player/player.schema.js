
import mongoose, {Schema,model} from 'mongoose';


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
        required : true
    },
    foot : {
        type : String,
        enum: ['DESTRO','SINISTRO','AMBIDESTRO'],
        required:true
    },
    height: {
        type : Number,
        required:false,
        dafault:0

    },
    weight:{
        type: Number,
        required:false
    },
    avatar:{
        type: String,
        required : true
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
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }


},{ timestamps: true,
    collection: 'players', 
  }
);



export default model('Player',playerSchema)
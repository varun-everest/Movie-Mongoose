import  {Schema} from 'mongoose';
import { currentInstance } from '../connection/connection';
import { Movie } from '../Types/types';

// "movieId","movieTitle","movieYear","movieURL","movieRank","critic_score","audience_score"

const MovieSchema = new Schema({
    movieId : {
        type : String,
        unique: true
    },
    movieTitle : {
        type : String
    },
    movieYear : {
        type: Number
    },
    movieURL : {
        type : String
    },
    movieRank : {
        type : Number
    },
    critic_score : {
        type : String
    },
    audience_score : {
        type : String,
    }
});

const MovieModel = currentInstance.model<Movie>('Movie', MovieSchema);

console.log("Successfully created Movie Model!!!");

export { MovieModel };
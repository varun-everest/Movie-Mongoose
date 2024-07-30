import  mongoose, {Schema} from 'mongoose';
import { currentInstance } from '../connection/connection';
import { Critic, objId } from '../Types/types';

const CriticSchema = new Schema({
    reviewId : {
        type : String
    },
    creationId : {
        type : String
    },
    criticName : {
        type : String
    },
    criticPageUrl : {
        type : String
    },
    reviewState : {
        type : String
    },
    isFresh : {
        type : Boolean
    },
    isRotten : {
        type : Boolean
    },
    isRtUrl : {
        type : Boolean
    },
    isTopCritic : {
        type : Boolean
    },
    publicationUrl : {
        type : String,
    },
    reviewUrl : {
        type : String
    },
    scoreSentiment : {
        type : String
    },
    originalScore : {
        type : String
    },
    movieId : {
        type : Schema.Types.ObjectId,
        ref : 'Movie'
    }
});

const CriticModel = currentInstance.model<Critic>('Critic', CriticSchema);
console.log("Successfully created Critic Model!!!");

export { CriticModel };
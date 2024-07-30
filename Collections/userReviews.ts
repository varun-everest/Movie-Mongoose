import  mongoose, {Schema, SchemaType} from 'mongoose';
import { currentInstance } from '../connection/connection'; 
import { Movie, User } from '../Types/types';

//"movieId","rating","quote","reviewId","isVerified","isSuperReviewer","hasSpoilers","hasProfanity","score","creationDate","userDisplayName","userRealm","userId"

const UserSchema = new Schema(
    {
        movieId : {
            type : Schema.Types.ObjectId,
            ref : 'Movie'
        },
        rating : {
            type : Number
        },
        reviewId : {
            type: String
        },
        isVerified : {
            type : Boolean
        },
        isSuperReviewer: {
            type : Boolean
        },
        hasSpoilers: {
            type : Boolean
        },
        hasProfanity : {
            type : Boolean
        },
        score : {
            type:Number,
        },
        creationDate : {
            type : String
        },
        userDisplayName: {
            type : String
        },
        userRealm: {
            type : String
        },
        userId: { 
            type : String,
            //unique : true,
            required : true
        },
    }
);

const UserModel = currentInstance.model<User>('User', UserSchema);
console.log("Successfullyy created UserModel");

export { UserModel};
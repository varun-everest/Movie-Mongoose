import mongoose, {Schema, SchemaType} from "mongoose";

interface Movie {
    movieId : String,
    movieTitle : String,
    movieYear : Number,
    movieURL : String,
    movieRank : Number,
    critic_score : String,
    audience_score : String,
}

// "movieId","movieTitle","movieYear","movieURL","movieRank","critic_score","audience_score"

//"movieId","rating","quote","reviewId","isVerified","isSuperReviewer","hasSpoilers","hasProfanity","score","creationDate","userDisplayName","userRealm","userId"

type objId = Schema.Types.ObjectId ;
interface User {
    movieId : objId,
    rating : Number,
    reviewId : String,
    isVerified : Boolean,
    isSuperReviewer: Boolean,
    hasSpoilers: Boolean,
    hasProfanity : Boolean,
    score : Number,
    creationDate : String,
    userDisplayName: String,
    userRealm: String,
    userId: String
}

//reviewId	creationDate	criticName	criticPageUrl	reviewState	isFresh	isRotten isRtUrl isTopCritic publicationUrl	publicationName	reviewUrl	quote	scoreSentiment	originalScore	movieId
interface Critic {
    reviewId : String,
    creationId : String,
    criticName : String,
    criticPageUrl : String,
    reviewState : String,
    isFresh : Boolean,
    isRotten: Boolean,
    isRtUrl : Boolean,
    isTopCritic : Boolean,
    publicationUrl : String,
    reviewUrl : String,
    scoreSentiment : String,
    originalScore : Number,
    movieId : Schema.Types.ObjectId
}

export { Movie, User, Critic, objId };
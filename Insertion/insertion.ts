import csvParser  from 'csv-parser';
import fs from 'fs';
import { MovieModel } from '../Collections/movie';
import { UserModel } from '../Collections/userReviews';
import { CriticModel } from '../Collections/critcReviews';
// import { objId } from '../Types/types';


export const readCSV = <T>(filePath: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      const results: T[] = [];
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results as T[]))
        .on('error', (error: any) => reject(error));
    });
};

export const insertMovieData = async(movieData: any[]) => {
   // MovieModel;
    await MovieModel.deleteMany();

    for(let mov of movieData) {
        // console.log(mov.critic_score);
        const newMovie = await MovieModel.create({
            movieId : mov.movieId,
            movieTitle : mov.movieTitle,
            movieYear : parseInt(mov.movieYear),
            movieURL : mov.movieURL,
            movieRank : parseInt(mov.movieRank),
            critic_score : mov.critic_score,
            audience_score : mov.audience_score
        });
        //await newMovie.save();
    }
    console.log("-__-_______-----_____ Successfully inserted!! ___ ------- __________");
    // const allMovies = await MovieModel.find();
    // console.log(allMovies);
};


function getBoolean(name : string) : Boolean {
    if(name.toLowerCase() === 'true')
        return true;
    return false;
}

 export async function getMovieId(id : string)  {
    const mov : any=  await MovieModel.find({movieId : id});
    console.log("Hello",mov);
    if(mov) {
        return mov[0]._id;
    }     
}

export const insertUserReviewsData = async(userData: any[]) => {
   // UserModel;
    await UserModel.deleteMany();

    for(let user of userData) {
        const newUser = await UserModel.create({
            movieId : getMovieId(user.movieId),
            rating : parseFloat(user.rating),
            reviewId : user.reviewId,
            isVerified : getBoolean(user.isVerified),
            isSuperReviewer : getBoolean(user.isSuperReviewer),
            hasProfanity : getBoolean(user.hasProfanity),
            hasSpoilers : getBoolean(user.hasSpoilers),
            score : parseFloat(user.score),
            creationDate : user.creationDate,
            userDisplayName : user.userDisplayName,
            userRealm : user.userRealm,
            userId : user.userId,
        }); 
    }
    console.log("SUCCESSFULLY INSERTED USERS!!!!!!!!");
}

const grade :{ [key : string] : Number}= {
    'A+' : 10,
    'A' : 9.5,
    'A-' : 9,
    'B+' : 8.5,
    'B'  : 8,
    'B-' : 7.5,
    'C+' : 7,
    'C' : 6.5,
    'C-' : 6,
    'D+' : 5.5,
    'D' : 5,
    'D-' : 4.5,
};

function getScore(data : string)  {

    if(data===""){
    }
    else{
        if(data.includes('/')) {
            const str : string[] = data.split('/');
            const nume : number = parseFloat(str[0]);
            const deno : number = parseFloat(str[1]);
            return ((10/deno)*nume).toFixed(2);
        }
        else if(data ==='+3 out of -4..+4'){
            return (10/parseFloat(data.slice(-2)))*parseFloat(data.slice(0,2));
        }
        else if(data.includes('+') || data.includes('-') || (data>='A' && data<='D')){
            return grade[data];

        }
        else if(data==='FIVE STARS'){
            return 10;
        }
    }
}

export const insertCriticReviewsData = async(criticData : any[]) => {
    //CriticModel;

    await CriticModel.deleteMany();

    for(let critic of criticData) {
        const newCritic = await CriticModel.create({
            reviewId : critic.reviewId,
            creationId : critic.creationId,
            criticName : critic.criticName,
            criticPageUrl : critic.criticPageUrl,
            reviewState : critic.reviewState,
            isFresh : getBoolean(critic.isFresh),
            isRotten : getBoolean(critic.isFresh),
            isRtUrl : getBoolean(critic.isRtUrl),
            isTopCritic : getBoolean(critic.isTopCritic),
            publicationUrl : critic.publicationUrl,
            reviewUrl : critic.reviewUrl,
            scoreSentiment : critic.scoreSentiment,
            originalScore : getScore(critic.originalScore),
            movieId : getMovieId(critic.movieId)
        });
    }
    console.log("Succcessfully Inserted criticss");
}



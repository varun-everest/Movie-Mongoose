import csv  from 'csv-parser';
import fs from 'fs';
import { MovieModel } from '../Collections/movie';
import { UserModel } from '../Collections/userReviews';
import { CriticModel } from '../Collections/critcReviews';

async function modify(data : any) {
    data.movieRank = parseInt(data.movieRank);
    data.movieYear = parseInt(data.movieYear);
    return data;
}

async function modifyCritic(data: any) {
    console.log(data);
    data.isFresh = data.isFresh.toLowerCase() === 'true' ? true : false;
    data.isRotten = data.isRotten.toLowerCase() === 'true' ? true : false;
    data.isRtUrl = data.isRtUrl.toLowerCase() === 'true' ? true : false;
    data.isTopCritic = data.isTopCritic.toLowerCase() === 'true' ? true : false;
    data.originalScore = getScore(data.originalScore);
    const val = await getMovieId(data.movieId)
    data.movieId = val[0]._id;
    return data;
}

async function modifyUserReview(data : any ) {
    const val = await getMovieId(data.movieId)
    data.movieId = val[0]._id;
    data.rating = parseFloat(data.rating);
    data.isVerified = getBoolean(data.isVerified);
    data.isSuperReviewer = getBoolean(data.isSuperReviewer);
    data.hasProfanity = getBoolean(data.hasProfanity);
    data.hasSpoilers = getBoolean(data.hasSpoilers);
    data.score = parseFloat(data.score);

    return data;
}

export const readCsvFile = async (filepath: string, model: string) => {
    return new Promise((resolve, reject) => {
        console.log(`Processing the file ${filepath}`)
        const stream = fs.createReadStream(filepath)
        const csvStream = csv();
        let processing = false;
        let recordCount = 0
        const csvPipe = stream.pipe(csvStream)
        csvPipe.on('data', async (data: any) => {
            csvPipe.pause();
            try {
                processing = true;
                if(model === 'movie') {
                    const newMovie = await modify(data);
                    await MovieModel.create(newMovie);
                } else if (model === 'critic') {
                    const newCritic = await modifyCritic(data);
                    await CriticModel.create(newCritic);
                } else if(model === 'user') {
                    const newUserReview = await modifyUserReview(data);
                    await UserModel.create(newUserReview);
                }
            }
            catch (e) {
                console.log("Error:", e);
            }
            finally {
                csvPipe.resume();
                processing = false;
            }
        })
            .on('end', () => {
                console.log(`EOF file reached for  Model`);
            })
            .on('error', (error: string) => reject(error))
    })
}



function getBoolean(name : String) : Boolean {
    if(name.toLowerCase() === 'true')
        return true;
    return false;
}

 export async function getMovieId(id : string)  {
    const mov =  await MovieModel.find({movieId : id});
    return mov;    
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
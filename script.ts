import { readFile } from "fs";
import { currentInstance } from "./connection/connection";
import { insertCriticReviewsData, insertMovieData, insertUserReviewsData, readCSV } from "./Insertion/insertion";

import { getMovieId } from "./Insertion/insertion";

currentInstance;

const readCSVData = async() => {

    const movieFilePath = './Data/movies.csv';
    const userReviewsFilePath = './Data/user_reviews.csv';
    const criticReviewsFilePath = './Data/critic_reviews.csv'
    const readMovieData = await readCSV(movieFilePath);
    //console.log(readMovieData);
    const readUserReviewsData = await readCSV(userReviewsFilePath);
    //console.log(readUserReviewsData);
    const readCriticReviewsData = await readCSV(criticReviewsFilePath);
    //console.log(readCriticReviewsData);

    insertMovieData(readMovieData);
    //insertUserReviewsData(readUserReviewsData);
    //insertCriticReviewsData(readCriticReviewsData);
    await getMovieId("e82e8623-76fa-3a2a-9fc3-1f5ce4fb4768");
};

readCSVData();


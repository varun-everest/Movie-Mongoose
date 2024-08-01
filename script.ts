import { readFile } from "fs";
import { currentInstance } from "./connection/connection";
import { readCsvFile } from "./Insertion/insertion";

import { getMovieId } from "./Insertion/insertion";

currentInstance;

const readCSVData = async() => {

    const movieFilePath = './Data/movies.csv';
    const userReviewsFilePath = './Data/user_reviews.csv';
    const criticReviewsFilePath = './Data/critic_reviews.csv'
    //const readMovieData = await readCsvFile(movieFilePath,'movie');
    //const readcriticData = await readCsvFile(criticReviewsFilePath, 'critic');
    //const readUserReviewData = await readCsvFile(userReviewsFilePath, 'user');
    
};

readCSVData();
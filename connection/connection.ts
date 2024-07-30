import mongoose from 'mongoose';


const currentInstance =  mongoose.createConnection(
    "mongodb://localhost/iMovieDB",
);
console.log("Successfully connected!!!!!!");

export { currentInstance };

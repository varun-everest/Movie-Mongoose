import mongoose from 'mongoose';


const currentInstance =  mongoose.createConnection(
    "mongodb://localhost/iMovieDB1",
);
console.log("Successfully connected!!!!!!");

export { currentInstance };

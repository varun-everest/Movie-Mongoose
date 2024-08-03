import { MovieModel } from "../Collections/movie";
import { CriticModel } from "../Collections/critcReviews";
import { UserModel } from "../Collections/userReviews";

export async function yearWiseMoviesCount() {
    const results = await MovieModel.aggregate([
        {
            $group : {
                _id : "$movieYear",
                count : {
                    $sum : 1
                }
            }
        },
        // {
        //     $group : {
        //         _id : "$count",
        //         countsofcount : {
        //             $sum : 1
        //         }
        //     }
        // },
        {
            $sort : {
                _id : 1
            }
        }
    ]);
    console.log(results);
};


export async function movieRatingFrequencies( movieTitle:string ) {
    const movie = await MovieModel.findOne( { movieTitle: movieTitle }, { _id:1 } );
    if(!movie){
      console.log("Movie doesn't exists!!");
      return;
    }
    
    const results = await UserModel.aggregate([
      {
        $match: {
          movieId: movie._id,
        }
      },
      {
        $group: {
          _id: "$rating",
          count: { $sum:1 }
        }
      },
      {
        $sort: {
          _id: -1
        }
      }
    ]);
    console.log(`Movie Name : ${movieTitle}`);
    console.log(results);
  }
  

  export async function movieCriticFrequencies( movieTitle:string )  {
     
    const movie = await MovieModel.findOne({ movieTitle: movieTitle },{ _id:1 });

    if(!movie){
      console.log("Movie Does not exists!");
      return;
    }
    
    const results = await CriticModel.aggregate([
      {
        $match: {
          movieId: movie._id,
        }
      },
      {
        $group: {
          _id: "$originalScore",
          count: { $sum:1 }
        }
      },
      {
        $sort: {
          _id:-1
        }
      }
    ]);
    console.log(`Movie Name : ${movieTitle}`);
    console.log(results);
  }
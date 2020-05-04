/** exercise files:
 * 
 * 
 */

// we use the command mongoimport to import data to mongodb
// it requires a few flags
// the first is  --db databse-name              // here we specify the name of our database
// next is --collection collection-name         // here we specify the name of the collection
// and --file filename.json                     // here we specify the name of the file from which we will import data
// and finally we have --jsonArray              // this is required when the data in filename.json is in the form of an array

// The command we use to import data from exercise-data.json
// mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray


const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const mongoDbUrl = process.env.MONGO_DB_URL;
// console.log(mongoDbUrl)
// const port = process.env.PORT || 5000;
const articles = require("../Model/Articles");
const articleData = require("../data/jsondata.json");
const connectWithDB = async () => {
  console.log("Connecting to the DB");
  const connectDB = await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Connected to the DB");
  insertData();
};
connectWithDB();
// const Data = articleData.map((article)=>{
//     return article.url

// })
// console.log(Data)

const insertData = async () => {
  // console.log("Inserting to the DB")

  // await articles.insertMany(articleData)
  // console.log("Inserted to the DB")

//   await articles.aggregate([
//     {
//       $group: {
//         country: "United States of America",
//         impactOverCountry: { $sum: "$impact" },
//       },
//     },
//   ]);

  //group by start_year and impact

//   db.articles.aggregate([
//     {
//       $group: {
//         _id: "$start_year",
//         totalImpact: { $sum: "$impact" },
//       },
//     },
//   ]);

  //group by country and sum by impact,likelihood,relevance,intensity

//   db.articles.aggregate([
//     {
//       $group: {
//         _id: "$country",
//         totalImpact: { $sum: "$impact" },
//       },
//     },
//   ]);

  db.articles.aggregate([
    {
      $group: {
        _id: "$country",
        totalImpact: { $sum: "$impact" },
        totalLikelihood: { $sum: "$likelihood" },
        totalRelevance: { $sum: "$relevance" },
        totalIntensity: { $sum: "$intensity" },
        frequency: { $sum: 1 },
      },
    },
  ]);

  db.articles.aggregate([
    {
      $group: {
        _id: "$country",
        totalRelevance: { $sum: "$relevance" },
      },
    },
  ]);
  db.articles.aggregate([
    {
      $group: {
        _id: "$country",
        totalIntensity: { $sum: "$intensity" },
      },
    },
  ]);

  //cal countryWIse prevYearavg Impact
  db.articles.aggregate([
    {
      $match: {
        start_year: { $lt: 2017 },
      },
    },

    {
      $group: {
        _id: "$country",
        percentageLossProfit: { $avg: "$impact" },
      },
    },
  ]);

  //cal countryWIse currYear Impact
};
db.articles.aggregate([
  {
    $match: { $expr: { $eq: [{ $year: "$added" }, 2017] } },
  },
  {
    $group: {
      _id: "$country",
      currSumImpact: { $sum: "$intensity" },
    },
  },
]);


db.articles.aggregate([
    {
        $group:{
            _id:"$topic",
            // total: { $sum: 1 }
        }
    },
    {
        $count:"totalCount"
    }
    
])


db.articles.aggregate(
    [
      {
        $group:
          {
            _id: {},
            minYear: { $min: "$end_year" }
          }
      }
    ]
 )



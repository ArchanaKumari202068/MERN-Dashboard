const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const mongoDbUrl = process.env.MONGO_DB_URL;
console.log(mongoDbUrl);
// const port = process.env.PORT || 5000;
const Articles = require("../Model/Articles");
const articleData = require("../data/jsondata.json");

const sectors = [
  "Aerospace & defence",
  "Automotive",
  "Construction",
  "Energy",
  "Environment",
  "Financial services",
  "Food & agriculture",
  "Government",
  "Healthcare",
  "Information Technology",
  "Manufacturing",
  "Media & entertainment",
  "Retail",
  "Security",
  "Support services",
  "Tourism & hospitality",
  "Transport",
  "Water",
];

const countries = [
  "Algeria",
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Belize",
  "Brazil",
  "Burkina Faso",
  "Canada",
  "China",
  "Colombia",
  "Cyprus",
  "Denmark",
  "Egypt",
  "Estonia",
  "Ethiopia",
  "Gabon",
  "Germany",
  "Ghana",
  "Greece",
  "Hungary",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kuwait",
  "Lebanon",
  "Liberia",
  "Libya",
  "Malaysia",
  "Mali",
  "Mexico",
  "Morocco",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Poland",
  "Qatar",
  "Russia",
  "Saudi Arabia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Syria",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Venezuela",
];

const topics = [
  "3D",
  "Washington",
  "administration",
  "agriculture",
  "aquaculture",
  "artificial intelligence",
  "asylum",
  "automaker",
  "bank",
  "battery",
  "biofuel",
  "brexit",
  "building",
  "business",
  "capital",
  "car",
  "carbon",
  "change",
  "city",
  "climate",
  "climate change",
  "clothing",
  "coal",
  "communication",
  "consumer",
  "consumption",
  "crisis",
  "data",
  "debt",
  "demand",
  "economic",
  "economic growth",
  "economy",
  "election",
  "electricity",
  "emission",
  "energy",
  "export",
  "factory",
  "farm",
  "finance",
  "food",
  "fossil fuel",
  "fracking",
  "gamification",
  "gas",
  "gasoline",
  "gdp",
  "government",
  "greenhouse gas",
  "growth",
  "ice",
  "industry",
  "inflation",
  "information",
  "infrastructure",
  "interest rate",
  "investment",
  "market",
  "material",
  "money",
  "nuclear",
  "oil",
  "peak oil",
  "plastic",
  "policy",
  "politics",
  "pollution",
  "population",
  "power",
  "production",
  "resource",
  "revenue",
  "risk",
  "robot",
  "security",
  "shale gas",
  "shortage",
  "software",
  "storm",
  "strategy",
  "tax",
  "technology",
  "tension",
  "terrorism",
  "tourist",
  "trade",
  "transport",
  "transportation",
  "unemployment",
  "vehicle",
  "war",
  "water",
  "wealth",
  "work",
  "worker",
  "workforce",
];

const regions = [
  "Africa",
  "Asia",
  "Central Africa",
  "Central America",
  "Central Asia",
  "Eastern Africa",
  "Eastern Asia",
  "Eastern Europe",
  "Europe",
  "Northern Africa",
  "Northern America",
  "Northern Europe",
  "Oceania",
  "South America",
  "South-Eastern Asia",
  "Southern Africa",
  "Southern Asia",
  "Southern Europe",
  "Western Africa",
  "Western Asia",
  "Western Europe",
  "World",
  "world",
];

const pestle = [
  "Economic",
  "Environmental",
  "Healthcare",
  "Industries",
  "Lifestyles",
  "Organization",
  "Political",
  "Social",
  "Technological",
];

const impact = {
  min: 1,
  max: 5,
};

const relevance = {
  min: 1,
  max: 5,
};
const intensity = {
  min: 1,
  max: 100,
};
const likelihood = {
  min: 1,
  max: 5,
};
const start_year = {
  min: 2016,
  max: 2050,
};
const end_year = {
  min: 2016,
  max: 2200,
};

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomValueFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const updateMissingValues = async () => {
  articleData.forEach(async (article) => {
    if (article.end_year == "" && article.start_year == "") {
      article.end_year = getRandomValue(end_year.min, end_year.max);
      article.start_year = getRandomValue(start_year.min, article.end_year);
    }
    if (article.end_year == "") {
      article.end_year = getRandomValue(article.start_year, end_year.max);
    }
    if (article.start_year == "") {
      article.start_year = getRandomValue(start_year.min, article.end_year);
    }
    if (article.intensity == "") {
      article.intensity = getRandomValue(intensity.min, intensity.max);
    }
    if (article.sector == "") {
      article.sector = randomValueFromArray(sectors);
    }
    if (article.topic == "") {
      article.topic = randomValueFromArray(topics);
    }
    if (article.region == "") {
      article.region = randomValueFromArray(regions);
    }
    if (article.impact == "") {
      article.impact = getRandomValue(impact.min, impact.max);
    }
    if (article.country == "") {
      article.country = randomValueFromArray(countries);
    }
    if (article.relevance == "") {
      article.relevance = getRandomValue(relevance.min, relevance.max);
    }
    if (article.pestle == "") {
      article.pestle = randomValueFromArray(pestle);
    }
    if (article.likelihood == "") {
      article.likelihood = getRandomValue(likelihood.min, likelihood.max);
    }
    const x = new Articles(article);
    x.save();
  });
};

const connectWithDB = async () => {
  console.log("Connecting to the DB");
  const connectDB = await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Connected to the DB");
  updateMissingValues();
  // insertData();
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
  // db.articles.aggregate([
  //   {
  //     $group: {
  //       _id: "$country",
  //       totalImpact: { $sum: "$impact" },
  //       totalLikelihood: { $sum: "$likelihood" },
  //       totalRelevance: { $sum: "$relevance" },
  //       totalIntensity: { $sum: "$intensity" },
  //       frequency: { $sum: 1 },
  //     },
  //   },
  // ]);
  // db.articles.aggregate([
  //   {
  //     $group: {
  //       _id: "$country",
  //       totalRelevance: { $sum: "$relevance" },
  //     },
  //   },
  // ]);
  // db.articles.aggregate([
  //   {
  //     $group: {
  //       _id: "$country",
  //       totalIntensity: { $sum: "$intensity" },
  //     },
  //   },
  // ]);
  // //cal countryWIse prevYearavg Impact
  // db.articles.aggregate([
  //   {
  //     $match: {
  //       start_year: { $lt: 2017 },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$country",
  //       percentageLossProfit: { $avg: "$impact" },
  //     },
  //   },
  // ]);
  //cal countryWIse currYear Impact
};
// db.articles.aggregate([
//   {
//     $match: { $expr: { $eq: [{ $year: "$added" }, 2017] } },
//   },
//   {
//     $group: {
//       _id: "$country",
//       currSumImpact: { $sum: "$intensity" },
//     },
//   },
// ]);

// db.articles.aggregate([
//     {
//         $group:{
//             _id:"$topic",
//             // total: { $sum: 1 }
//         }
//     },
//     {
//         $count:"totalCount"
//     }

// ])

// db.articles.aggregate(
//     [
//       {
//         $group:
//           {
//             _id: {},
//             minYear: { $min: "$end_year" }
//           }
//       }
//     ]
//  )

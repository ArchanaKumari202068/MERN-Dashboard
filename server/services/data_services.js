const Article = require("../Model/Articles");
const statisticService = async (category) => {
  const response = await Article.aggregate([
    {
      $group: {
        _id: `$${category}`,
        // total: { $sum: 1 }
      },
    },
    {
      $count: "totalCount",
    },
  ]);

  return response;
};

const getArticlesCount = async () => {
  const count = await Article.find().count();
  return count;
};

const getYearByFilter = async (year) => {
  const response = await Article.aggregate([
    {
      $group: {
        _id: {},
        minYear: { $min: `$${year}` },
        maxYear: { $max: `$${year}` },
      },
    },
  ]);
  return response;
};

const getBarGraph = async (category, value) => {
  const impactBYCountry = await Article.aggregate([
    {
      $group: {
        _id: `$${category}`,
        [value]: { $sum: `$${value}` },
      },
    },
  ]);
  return impactBYCountry;
};
// const filterByYr = async()

const getLineGraph = async () => {
  const impactByYear = await Article.aggregate([
    {
      $group: {
        _id: "$start_year",
        totalImpact: { $sum: "$impact" },
      },
    },
  ]);
  return impactByYear;
};

const getRadarGraph = async () => {
  const compareCountryByAllval = await Article.aggregate([
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
  return compareCountryByAllval;
};

const getscatterGraph = async (xvalue,yvalue,categories) => {
  const impactVsIntensity = await Article.aggregate([{
   
          $group: {
            _id: `$${categories}`,
            x_values: { $sum: `$${xvalue}` },
            y_values: { $sum: `$${yvalue}` },
          },  
  }]);
  return impactVsIntensity
};
module.exports = {
  statisticService,
  getArticlesCount,
  getYearByFilter,
  getBarGraph,
  getLineGraph,
  getRadarGraph,
  getscatterGraph
};

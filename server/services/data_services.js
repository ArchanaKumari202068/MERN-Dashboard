const Articles = require("../Model/Articles");
const Article = require("../Model/Articles");

const getYearsFilter = (start_year_range, end_year_range) => {
  return {
    $or: [
      {
        start_year: {
          $gte: start_year_range.start,
          $lte: start_year_range.end,
        },
      },
      { start_year: null },
    ],
    $or: [
      {
        end_year: {
          $gte: end_year_range.start,
          $lte: end_year_range.end,
        },
      },
      {
        end_year: null,
      },
    ],
  };
};

const statisticService = async (category, start_year_range, end_year_range) => {
  const response = await Article.aggregate([
    { $match: getYearsFilter(start_year_range, end_year_range) },
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

const getArticlesCount = async (start_year_range, end_year_range) => {
  const count = await Article.find(
    getYearsFilter(start_year_range, end_year_range)
  ).count();
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

const getBarGraph = async (
  category,
  value,
  start_year_range,
  end_year_range
) => {
  const impactBYCountry = await Article.aggregate([
    { $match: getYearsFilter(start_year_range, end_year_range) },
    {
      $group: {
        _id: `$${category}`,
        value: { $sum: `$${value}` },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        value: 1,
      },
    },
  ]);
  return impactBYCountry;
};
// const filterByYr = async()

const getLineGraph = async (
  category,
  category_value,
  value,
  start_year_range,
  end_year_range
) => {
  const impactByYear = await Article.aggregate([
    { $match: getYearsFilter(start_year_range, end_year_range) },
    { $match: { [category]: category_value } },
    {
      $group: {
        _id: "$start_year",
        total: { $sum: `$${value}` },
      },
    },
    {
      $project: {
        year: "$_id",
        value: "$total",
        _id: 0,
      },
    },
    {
      $sort: {
        year: 1,
      },
    },
  ]);
  return impactByYear;
};

const getAllCategoryNames = async (category) => {
  const response = await Article.distinct(category);
  return response;
};

const getRadarGraph = async (category, start_year_range, end_year_range) => {
  const compareCountryByAllval = await Article.aggregate([
    { $match: getYearsFilter(start_year_range, end_year_range) },
    {
      $group: {
        _id: `$${category}`,
        impact: { $sum: "$impact" },
        likelihood: { $sum: "$likelihood" },
        relevance: { $sum: "$relevance" },
        intensity: { $sum: "$intensity" },
        frequency: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        impact: 1,
        likelihood: 1,
        relevance: 1,
        intensity: 1,
        frequency: 1,
      },
    },
  ]);
  return compareCountryByAllval;
};

const getscatterGraph = async (
  xvalue,
  yvalue,
  category,
  start_year_range,
  end_year_range
) => {
  const impactVsIntensity = await Article.aggregate([
    { $match: getYearsFilter(start_year_range, end_year_range) },
    {
      $project: {
        [category]: 1,
        [xvalue]: 1,
        [yvalue]: 1,
      },
    },
    {
      $sort: {
        [xvalue]: 1,
      },
    },
  ]);
  return impactVsIntensity;
};
module.exports = {
  statisticService,
  getArticlesCount,
  getYearByFilter,
  getBarGraph,
  getLineGraph,
  getRadarGraph,
  getscatterGraph,
  getAllCategoryNames,
};

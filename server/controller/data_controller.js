const { response } = require("express");
const {
  statisticService,
  getArticlesCount,
  getYearByFilter,
  getBarGraph,
  getLineGraph,
  getRadarGraph,
  getscatterGraph,
  getAllCategoryNames,
  getArticlesIncreased,
} = require("../services/data_services");

const splitRange = (range) => {
  const ranges = range.split("-");
  return {
    start: Number(ranges[0]),
    end: Number(ranges[1]),
  };
};

const statistics = async (req, res) => {
  try {
    let { start_year_range, end_year_range } = req.query;

    start_year_range = splitRange(start_year_range);
    end_year_range = splitRange(end_year_range);

    console.log(start_year_range, end_year_range);
    const categories = ["country", "topic", "sector", "source"];

    const data = {};

    for (let i = 0; i < categories.length; i++) {
      const response = await statisticService(
        categories[i],
        start_year_range,
        end_year_range
      );
      data[categories[i]] = response[0]?.totalCount;
    }

    data["article"] = await getArticlesCount(start_year_range, end_year_range);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getYearRanges = async (req, res) => {
  try {
    const year = ["start_year", "end_year"];
    const yearAll = {};
    for (let i = 0; i < year.length; i++) {
      const response = await getYearByFilter(year[i]);
      yearAll[year[i]] = {
        minyear: response[0]?.minYear,
        maxYear: response[0]?.maxYear,
      };
    }
    res.json(yearAll);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const bar = async (req, res) => {
  try {
    const { category, value, start_year_range, end_year_range } = req.query;

    const bar = await getBarGraph(
      category,
      value,
      start_year_range,
      end_year_range
    );

    res.json(bar);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const line = async (req, res) => {
  try {
    const { category, value, start_year_range, end_year_range } = req.query;

    const categoryNames = await getAllCategoryNames(category);
    let data = {};
    await Promise.all(
      categoryNames.map(async (category_val) => {
        data[category_val] = await getLineGraph(
          category,
          category_val,
          value,
          start_year_range,
          end_year_range
        );
      })
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const radar = async (req, res) => {
  try {
    const { category, start_year_range, end_year_range } = req.query;
    const radar = await getRadarGraph(
      category,
      start_year_range,
      end_year_range
    );
    res.json(radar);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const scatter = async (req, res) => {
  try {
    const { xvalue, yvalue, category, start_year_range, end_year_range } =
      req.query;
    const scatter = await getscatterGraph(
      xvalue,
      yvalue,
      category,
      start_year_range,
      end_year_range
    );
    res.json(scatter);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const articlesIncreased = async (req, res) => {
  try {
    let { category, currentYear } = req.query;
    if (!currentYear) {
      currentYear = 2017;
    }
    const response = await getArticlesIncreased(category, currentYear);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  statistics,
  getYearRanges,
  bar,
  line,
  radar,
  scatter,
  articlesIncreased,
};

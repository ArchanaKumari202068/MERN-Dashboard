const categories = ["country", "topic", "sector", "source", "region", "pestle"];
const values = ["impact", "intensity", "relevance", "likelihood"];
const splitRange = (range) => {
  const ranges = range.split("-");
  return {
    start: Number(ranges[0]),
    end: Number(ranges[1]),
  };
};
const validateYearRanges = (req, res, next) => {
  const { start_year_range, end_year_range } = req.query;
  if (!start_year_range || !end_year_range) {
    return res.status(400).json({
      message:
        "Request should contain start_year_range and end_year_range in the following format: ?start_year_range=2016-2020&end_year_range=2016-2018",
    });
  }
  req.query.start_year_range = splitRange(start_year_range);
  req.query.end_year_range = splitRange(end_year_range);
  next();
};

const validateCategories = (req, res, next) => {
  const { category } = req.query;
  if (!category || !categories.includes(category)) {
    return res.status(400).json({
      message: `catgory field is required and it should be one of the following values ${categories}`,
    });
  }
  next();
};

const validateValues = (req, res, next) => {
  const { value } = req.query;
  if (!value || !values.includes(value)) {
    return res.status(400).json({
      message: `value field is required and it should be one of the following values ${values}`,
    });
  }
  next();
};

const validateXYValues = (req, res, next) => {
  const { xvalue, yvalue } = req.query;
  if (!xvalue || !values.includes(xvalue)) {
    return res.status(400).json({
      message: `xvalue field is required and it should be one of the following values ${values}`,
    });
  }
  if (!yvalue || !values.includes(yvalue)) {
    return res.status(400).json({
      message: `yvalue field is required and it should be one of the following values ${values}`,
    });
  }
  next();
};

module.exports = {
  validateCategories,
  validateValues,
  validateYearRanges,
  validateXYValues,
};

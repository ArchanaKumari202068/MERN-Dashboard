const { response } = require("express");
const {
  statisticService,
  getArticlesCount,
  getYearByFilter,
  getBarGraph,
  getLineGraph,
  getRadarGraph,
  getscatterGraph
} = require("../services/data_services");

const statistics = async (req, res) => {
  const categories = ["country", "topic", "sector", "source"];

  const data = {};

  for (let i = 0; i < categories.length; i++) {
    const response = await statisticService(categories[i]);
    data[categories[i]] = response[0]?.totalCount;
  }

  data["article"] = await getArticlesCount();

  res.send({ data });
};

const filterByYr = async (req, res) => {
  const year = ["start_year", "end_year"];
  const yearAll = {};
  for (let i = 0; i < year.length; i++) {
    const response = await getYearByFilter(year[i]);
    // console.log(year[i],getYear)
    console.log()
    yearAll[year[i]] = {
      minyear: response[0]?.minYear,
      maxYear: response[0]?.maxYear,
    };
    console.log("get year", yearAll);
  }

  res.send("test");
};


const bar =async(req,res)=>{
    const {category,value} = req.query;
    const bar = await getBarGraph(category,value)

    res.send(bar)
}

const line = async(req,res)=>{
    const line = await getLineGraph()
    res.send(line)
}

const radar = async(req,res)=>{
    const radar = await getRadarGraph()
    res.send(radar)
}

const scatter = async(req,res)=>{
    // const categories = ["country", "topic", "sector", "source"];
    // for (let i = 0; i < categories.length; i++) {

        const scatter = await getscatterGraph(xvalue,yvalue,categories)
        const {xvalue,yvalue,categories} = req.query;
    // }
    res.send(scatter)

}
module.exports = { statistics, filterByYr,bar,line ,radar,scatter};

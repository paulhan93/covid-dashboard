// API urls
let url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";

// maybe make into more general converting function (raw -> json)
// get data of total new cases, recovered, and deaths. (Bar/Line graph)
async function getAllData() {
  const rawData = await fetch(url);
  if (rawData == undefined) {
    console.log("Error.");
  }
  const jsonData = await rawData.json();

  return jsonData;
}

// check to see promise is fulfilled
console.log(getAllData());



// manipulate above data to display in line graph
function createLineGraph() {
  const DATA_COUNT = 17;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 20000 };

  const labels = Utils.months({count: DATA_COUNT})
  const data = {
      labels: labels,
      datasets: [
          {
              label: 'New Cases',
              data: Utils.numbers(NUMBER_CFG),
              borderColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
          }
      ]
  }

  const linegraph = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };
}

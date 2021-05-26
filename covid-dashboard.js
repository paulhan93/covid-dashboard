// API urls
const url1 = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"; // new cases

getData(url1);

// fetch url & convert to json data format
async function getData(url) {
  const rawData = await fetch(url);
  if (rawData == undefined) {
    console.log("Error.");
  }

  let response = await rawData.json();

  graphCases(response);
  //graphDeaths(response);
  //graphRecovery(response);
}

function graphCases(data) {
  // contain date and number of cases
  let date = [];
  let cases = [];
  console.log(data.cases);

  // push date and number of cases
  for (let i in Object(data.cases)) {
    date.push(i);
    cases.push(data.cases[i]);
  }

  console.log(date);
  console.log(cases);


  let labels2 = date;
  let data2 = cases;
  let colors2 = ["#49A9EA"];
  //let colors2 = ["#49A9EA", "#36CAAB", "#34495E", "#B370CF"];

  let myChart2 = document.getElementById("myChart2").getContext("2d");
  let chart2 = new Chart(myChart2, {
    type: "line",
    data: {
      labels: labels2,
      datasets: [
        {
          data: data2,
          backgroundColor: colors2,
        },
      ],
    },
    options: {
      title: {
        text: "Do you like doughnuts?",
        display: true,
      },
    },
  });
}

/*
function graphDeaths(data) {
  console.log(data.deaths);
}

function graphRecovery(data) {
  console.log(data.recovered);
}
*/

// charts & graphs
let labels1 = ["Yes", "yes but in green"];
let data1 = [69, 31];
let colors1 = ["#49A9EA", "36CAAB"];

let myChart1 = document.getElementById("myChart").getContext("2d");
let chart1 = new Chart(myChart1, {
  type: "doughnut",
  data: {
    labels: labels1,
    datasets: [
      {
        data: data1,
        backgroundColor: colors1,
      },
    ],
  },
  options: {
    title: {
      text: "Do you like doughnuts?",
      display: true,
    },
  },
});

/*

window.unload = createLineGraph();

// manipulate above data to display in line graph
function createLineGraph() {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 20000 };

  const labels = Utils.months({ count: DATA_COUNT });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "New Cases",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

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
*/

/*
//let container = $('#information').
$(function () {

  $("#information").text('hello');

});
*/

// API urls
const url1 = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"; // new cases, deaths, recoveries

getData(url1);

// fetch url & convert to json data format
async function getData(url) {
  const rawData = await fetch(url);
  if (rawData == undefined) {
    console.log("Error.");
  }

  let response = await rawData.json();

  graphCases(response);
  graphDeaths(response);
  graphRecovery(response);
}


function graphCases(data) {
  // contain date and number of cases
  let date = [];
  let cases = [];

  // push date and number of cases
  for (let i in Object(data.cases)) {
    date.push(i);
    cases.push(data.cases[i]);
  }

  // output to console
  console.log(data.cases);
  console.log(date);
  console.log(cases);

  console.log(cases[0].toLocaleString());


  // grab DOM element and create chart
  let myChart = document.getElementById("casesLineGraph").getContext("2d");
  let chart = new Chart(myChart, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: cases,
          backgroundColor: ["#49A9EA"],
        },
      ],
    },
    options: {
      legend: {
        display: false,
        //position: "bottom",
      },
      title: {
        text: "Total Cases",
        display: true,
      },
    },
  });
}


function graphDeaths(data) {
  // contain date and number of cases
  let date = [];
  let cases = [];

  // push date and number of cases
  for (let i in Object(data.deaths)) {
    date.push(i);
    cases.push(data.deaths[i]);
  }

  // output to console
  console.log(data.deaths);
  console.log(date);
  console.log(cases);

  // grab DOM element and create chart
  let myChart = document.getElementById("deathsLineGraph").getContext("2d");
  let chart = new Chart(myChart, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: cases,
          backgroundColor: ["#AB271E"],
        },
      ],
    },
    options: {
      legend: {
        display: false,
        //position: "bottom",
      },
      title: {
        text: "Deaths",
        display: true,
      },
    },
  });
}


function graphRecovery(data) {
  // contain date and number of cases
  let date = [];
  let cases = [];

  // push date and number of cases
  for (let i in Object(data.recovered)) {
    date.push(i);
    cases.push(data.recovered[i]);
  }

  // output to console
  console.log(data.recovered);
  console.log(date);
  console.log(cases);

  // grab DOM element and create chart
  let myChart = document.getElementById("recoveredLineGraph").getContext("2d");
  let chart = new Chart(myChart, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: cases,
          backgroundColor: ["#29BF00"],
        },
      ],
    },
    options: {
      legend: {
        position: "bottom",
        display: false,
      },
      title: {
        text: "Recovered",
        display: true,
      },
    },
  });
}


/*
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
*/
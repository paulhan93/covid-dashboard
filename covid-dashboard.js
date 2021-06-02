// API urls
const url1 = "https://disease.sh/v3/covid-19/historical/all?lastdays=all"; // new cases, deaths, recoveries
const url2 = "https://disease.sh/v3/covid-19/all";
const url3 = "https://disease.sh/v3/covid-19/countries/usa";

// deploy charts & graphs in DOM
getData();

// fetch url & convert to json data format
async function getData() {
  const rawData1 = await fetch(url1);
  const rawData2 = await fetch(url2);
  const rawData3 = await fetch(url3);

  if (rawData1 == undefined || rawData2 == undefined || rawData3 == undefined) {
    console.log("Error.");
  }

  let response1 = await rawData1.json();
  let response2 = await rawData2.json();
  let response3 = await rawData3.json();

  graphs(response1);
  charts(response2, response3);
}

function graphs(data) {
  // contain date and number of cases
  let date = [];
  let cases = [];
  let deaths = [];
  let recovered = [];

  // push date and number of cases
  for (let i in Object(data.cases)) {
    date.push(i);
    cases.push(data.cases[i]);
    deaths.push(data.deaths[i]);
    recovered.push(data.recovered[i]);
  }

  // output to console
  console.log(date);
  console.log(cases);
  console.log(deaths);
  console.log(recovered);

  // example; delete later
  console.log(
    cases[cases.length - 1].toLocaleString("en-US", {
      notation: "compact",
      compactDisplay: "short",
    })
  );

  console.log(
    deaths[deaths.length - 1].toLocaleString("en-US", {
      notation: "compact",
      compactDisplay: "short",
    })
  );

  console.log(
    recovered[recovered.length - 1].toLocaleString("en-US", {
      notation: "compact",
      compactDisplay: "short",
    })
  );

  let allGraphs = document.getElementById("allGraphs").getContext("2d");
  new Chart(allGraphs, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Cases",
          data: cases,
          backgroundColor: ["#49A9EA"],
          borderColor: ["#2D85CF"],
        },
        {
          label: "Deaths",
          data: deaths,
          backgroundColor: ["#EE474C"],
          borderColor: ["#AB271E"],
        },
        {
          label: "Recovered",
          data: recovered,
          backgroundColor: ["#47EE63"],
          borderColor: ["#29BF00"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        title: {
          text: "Global Statistics",
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "date",
          },
        },
        y: {
          title: {
            display: true,
            text: "count",
          },
          ticks: {
            callback: function (value, index, values) {
              return value / 1e6 + "M";
            },
          },
        },
      },
    },
  });
}

function charts(globalData, usaData) {
  let globalCases = globalData.cases;
  let globalDeaths = globalData.deaths;
  let globalRecovered = globalData.recovered;

  let usaCases = usaData.cases;
  let usaDeaths = usaData.deaths;
  let usaRecovered = usaData.recovered;

  console.log(globalCases);
  console.log(usaCases);

  let globalPie = document.getElementById("globalPie").getContext("2d");
  new Chart(globalPie, {
    type: "pie",
    data: {
      labels: ["Cases", "Deaths", "Recovered"],
      datasets: [
        {
          data: [globalCases, globalDeaths, globalRecovered],
          backgroundColor: ["#49A9EA", "#EE474C", "#47EE63"],
          borderColor: ["#2D85CF", "#AB271E", "#29BF00"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        title: {
          text: "Global Covid-19 Pie Chart",
          display: true,
        },
      },
    },
  });

  let usaPie = document.getElementById("usaPie").getContext("2d");
  new Chart(usaPie, {
    type: "pie",
    data: {
      labels: ["Cases", "Deaths", "Recovered"],
      datasets: [
        {
          data: [usaCases, usaDeaths, usaRecovered],
          backgroundColor: ["#49A9EA", "#EE474C", "#47EE63"],
          borderColor: ["#2D85CF", "#AB271E", "#29BF00"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
        },
        title: {
          text: "USA Covid-19 Pie Chart",
          display: true,
        },
      },
    },
  });
}

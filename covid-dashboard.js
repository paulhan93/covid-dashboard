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

  graph(response);
}

function graph(data) {
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

  let deathsToday = deaths[deaths.length - 1];
  let recoveredToday = recovered[recovered.length - 1];
  let restToday = cases[cases.length - 1] - deaths[deaths.length - 1] - recovered[recovered.length - 1];

  // grab DOM element and create chart
  let caseGraph = document.getElementById("casesLineGraph").getContext("2d");
  new Chart(caseGraph, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          //label: "Total Cases",
          data: cases,
          backgroundColor: ["#49A9EA"],
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          text: "Cases",
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

  let deathGraph = document.getElementById("deathsLineGraph").getContext("2d");
  new Chart(deathGraph, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: deaths,
          backgroundColor: ["#AB271E"],
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          text: "Deaths",
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

  let recoveredGraph = document
    .getElementById("recoveredLineGraph")
    .getContext("2d");
  new Chart(recoveredGraph, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          data: recovered,
          backgroundColor: ["#29BF00"],
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          text: "Recovered",
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

  // pie chart
  let pieChart = document.getElementById("cdPieChart").getContext("2d");
  new Chart(pieChart, {
    type: "pie",
    data: {
      labels: ["Recovered", "Deaths","Unaccounted"],
      datasets: [
        {
          data: [recoveredToday, deathsToday, restToday],
          backgroundColor: ["#29BF00", "#AB271E","#49A9EA"],
          hoverOffset: 4
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
}

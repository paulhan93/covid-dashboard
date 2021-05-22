let url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";



// get data of total new cases, recovered, and deaths. (Bar/Line graph)
async function getAllData() {
    const rawData = await fetch(url);
    if(rawData == undefined) {
        console.log("Error.")
    }
    const jsonData = await rawData.json();

    return jsonData;
}




const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };
async function getData() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    renderTemplate(data);
  } catch (error) {
    console.error("Błąd podczas pobierania danych: ", error);
  }
}

getData();

const elements = document.getElementsByClassName("element");

function renderTemplate(data) {
  const titleData = data.map((element) => element.title);

  titleData.forEach((titleText, index) => {
    if (elements[index]) {
      const title = document.createElement("h1");
      title.innerHTML = titleText;
      elements[index].appendChild(title);
    }
  });

  // Poprawne mapowanie dailyData
  const dailyData = data.map((element) => ({
    current: element.timeframes.daily.current,
    previous: element.timeframes.daily.previous,
  }));

  dailyData.forEach((timeframe, index) => {
    if (elements[index]) {
      const dailyCurrent = document.createElement("h2");
      const dailyPrevious = document.createElement("h3");
      dailyCurrent.innerHTML = `Current: ${timeframe.current} hrs`;
      dailyPrevious.innerHTML = `Previous: ${timeframe.previous} hrs`;
      elements[index].appendChild(dailyCurrent);
      elements[index].appendChild(dailyPrevious);
    }
  });
}

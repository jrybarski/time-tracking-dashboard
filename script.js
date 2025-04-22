const elements = document.getElementsByClassName("element");
const buttonDaily = document.querySelector(".daily");
const buttonWeekly = document.querySelector(".weekly");
const buttonMonthly = document.querySelector(".monthly");

let timeframeData = [];

async function getData() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);

    timeframeData = data.map((element) => ({
      title: element.title,
      dailyCurrent: element.timeframes.daily.current,
      dailyPrevious: element.timeframes.daily.previous,
      weeklyCurrent: element.timeframes.weekly.current,
      weeklyPrevious: element.timeframes.weekly.previous,
      monthlyCurrent: element.timeframes.monthly.current,
      monthlyPrevious: element.timeframes.monthly.previous,
    }));

    renderTemplate();
    updateTemplate("daily");
  } catch (error) {
    console.error("Błąd podczas pobierania danych: ", error);
  }
}

getData();

function renderTemplate() {
  timeframeData.forEach((timeframe, index) => {
    if (elements[index]) {
      const title = document.createElement("h1");
      title.innerHTML = timeframe.title;
      elements[index].appendChild(title);

      const timeLaps = document.createElement("div");
      timeLaps.classList.add("time-laps");

      const elementCurrent = document.createElement("h2");
      elementCurrent.classList.add("current");
      timeLaps.appendChild(elementCurrent);

      const elementPrevious = document.createElement("h3");
      elementPrevious.classList.add("previous");
      timeLaps.appendChild(elementPrevious);

      elements[index].appendChild(timeLaps);
    }
  });
}

function updateTemplate(view) {
  timeframeData.forEach((timeframe, index) => {
    if (elements[index]) {
      const elementCurrent = elements[index].querySelector(".current");
      const elementPrevious = elements[index].querySelector(".previous");

      if (view === "daily") {
        buttonWeekly.classList.remove("active");
        buttonMonthly.classList.remove("active");
        elementCurrent.innerHTML = `${timeframe.dailyCurrent}hrs`;
        elementPrevious.innerHTML = `Last week - ${timeframe.dailyPrevious}hrs`;
        buttonDaily.classList.add("active");
      } else if (view === "weekly") {
        buttonDaily.classList.remove("active");
        buttonMonthly.classList.remove("active");
        elementCurrent.innerHTML = `${timeframe.weeklyCurrent}hrs`;
        elementPrevious.innerHTML = `Last week -  ${timeframe.weeklyPrevious}hrs`;
        buttonWeekly.classList.add("active");
      } else if (view === "monthly") {
        buttonWeekly.classList.remove("active");
        buttonDaily.classList.remove("active");
        elementCurrent.innerHTML = `${timeframe.monthlyCurrent}hrs`;
        elementPrevious.innerHTML = `Last week - ${timeframe.monthlyPrevious}hrs`;
        buttonMonthly.classList.add("active");
      }
    }
  });
}

buttonDaily.addEventListener("click", () => updateTemplate("daily"));
buttonWeekly.addEventListener("click", () => updateTemplate("weekly"));
buttonMonthly.addEventListener("click", () => updateTemplate("monthly"));

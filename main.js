const cardWrapper = document.querySelector(".activity-card--wrapper");
const activityCardBtns = document.querySelectorAll(".activity-card__btn");
let activityCards = [];
let timeframe = "weekly";

activityCardBtns.forEach((btn) => {
 btn.addEventListener("click", activityCardBtnsOnClick)
});


function activityCardBtnsOnClick(ev) {
  activityCardBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  ev.target.classList.add("active");
  timeframe = ev.target.innerText.toLowerCase();

    updateCards(timeframe);
}

let activityCardsData = {};

const fetchData = async () => {
  const response = await fetch("./data.json");
  const data = await response.json();
  activityCards = data;


  activityCards.forEach((element) => {
    cardWrapper.insertAdjacentHTML(
      "beforeend",
      renderActivityCard(element, timeframe)
    );
  });

  activityCards.forEach((element) => {
    activityCardsData[element.title] = element.timeframes;
  });

  activityCards = document.querySelectorAll(".activity-card--main");
};

// updating activity  cards
function updateCards(timeframe) {
  activityCards.forEach((card) => {
    updateCard(card, timeframe);
  });
}

// updating activity card
function updateCard(card, timeframe) {
  const cardTitle = card.querySelector(".card-title").innerText;
  const currentTimeframe = activityCardsData[cardTitle][timeframe]["current"];
  const previousTimeframe = activityCardsData[cardTitle][timeframe]["previous"];

  const timeframeText = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  const currentTimeframeText = card.querySelector(".current-timeframe");
  currentTimeframeText.innerText = `${currentTimeframe}hrs`;
  const textElement = card.querySelector(".timeframe-text");
  textElement.innerText = `${timeframeText[timeframe]} - ${previousTimeframe}hrs`;
}

// render activity cards
function renderActivityCard(element, timeframe) {
  const cardTitle = element["title"];
  const cardClassName = cardTitle.toLowerCase().replace(" ", "-");
  const currentTimeframe = element["timeframes"][timeframe]["current"];
  const previousTimeframe = element["timeframes"][timeframe]["previous"];

  const timeframeText = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  return `
    <div class="activity-card activity-card--main activity-card--${cardClassName}">
      <div class="activity-card__content">
        <div class="flex bottom-spacing">
          <h2 class="card-title fs-heading-s">${cardTitle}</h2>
          <div class="menus">
            <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                fill="#BBC0FF" fill-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="flex column">
          <h3 class="fs-heading-l current-timeframe">${currentTimeframe}hrs</h3>
          <p class="timeframe-text">${timeframeText[timeframe]} - ${previousTimeframe}hrs</p>
        </div>
      </div>
    </div>
  `;
}

fetchData();

const startContainer = document.querySelector("#start-container");

function start() {
  $(startContainer).hide();

  $("#game-container").append(`<div id="player"></div>`);
  $("#game-container").append(`<div id="enemy1"></div>`);
  $("#game-container").append(`<div id="enemy2"></div>`);
  $("#game-container").append(`<div id="friend"></div>`);
}

startContainer.addEventListener("click", start);

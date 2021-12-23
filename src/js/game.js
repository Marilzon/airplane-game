const startContainer = document.querySelector("#start-container");

function start() {
  $(startContainer).hide();

  $("#game-container").append(`<div class="animationApache" id="player"></div>`);
  $("#game-container").append(`<div class="animationEnemy1" id="enemy1"></div>`);
  $("#game-container").append(`<div id="enemy2"></div>`);
  $("#game-container").append(`<div class="animationFriend" id="friend"></div>`);
}

startContainer.addEventListener("click", start);

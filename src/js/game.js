const startContainer = document.querySelector("#start-container");
const gameContainer = document.querySelector("#game-container");

function start() {

  $(startContainer).hide();
  $(gameContainer).append(`<div class="animationApache" id="player"></div>`);
  $(gameContainer).append(`<div class="animationEnemy1" id="enemy1"></div>`);
  $(gameContainer).append(`<div id="enemy2"></div>`);
  $(gameContainer).append(`<div class="animationFriend" id="friend"></div>`);

  const game = {};
  const KEY = {
    W: 87,
    S: 83,
    D: 68
  }

  game.press = [];

  $(document).keydown((event) => {
    game.press[event.which] = true;
  });

  $(document).keyup((event) => {
    game.press[event.which] = false;
  });

  function moveBackground() {
    let left = parseInt($(gameContainer).css("background-position"));
    $(gameContainer).css("background-position", left - 1);
  }

  function movePlayer() {
    let player = document.querySelector("#player");

    if (game.press[KEY.W]) {
      let top = parseInt($(player).css("top"));
      $(player).css("top", top - 10);
      if (top <= 0) {
        $(player).css("top", top + 10);
      }
    }

    if (game.press[KEY.S]) {
      let top = parseInt($(player).css("top"));
      $(player).css("top", top + 10);
      if (top >= 432) {
        $(player).css("top", top - 10);
      }
    }

    if (game.press[KEY.D]) {

    }
  }

  function loop() {
    moveBackground();
    movePlayer()
  }

  game.timer = setInterval(loop, 30);
}

startContainer.addEventListener("click", start);

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

  let velocity = 5;
  let positionY = parseInt(Math.random() * 334);
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

  function moveEnemy1() {
    let enemy1 = document.querySelector("#enemy1");
    let positionX = parseInt($(enemy1).css("left"));

    $(enemy1).css("left", positionX - velocity);
    $(enemy1).css("top", positionY);

    if (positionX <= 0) {
      positionY = parseInt(Math.random() * 334);
      $(enemy1).css("left", 694);
      $(enemy1).css("top", positionY);
    }
  }

  function moveEnemy2() {
    let enemy2 = document.querySelector("#enemy2");
    let positionX = parseInt($(enemy2).css("left"));

    $(enemy2).css("left", positionX - 3);

    if (positionX <= 0) {
      $(enemy2).css("left", 755);
    }
  }

  function moveFriend() {
    let friend = document.querySelector("#friend");
    let positionX = parseInt($(friend).css("left"));

    $(friend).css("left", positionX + 1);

    if (positionX > 906) {
      $(friend).css("left", 0);
    }
  }

  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
    moveFriend();
  }

  game.timer = setInterval(loop, 30);
}

startContainer.addEventListener("click", start);

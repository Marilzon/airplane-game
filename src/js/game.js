const startContainer = document.querySelector("#start-container");
const gameContainer = document.querySelector("#game-container");

function start() {
  let velocity = 5;
  let positionY = parseInt(Math.random() * 334);
  let letsShot = true;

  const game = {};
  const KEY = {
    W: 87,
    S: 83,
    D: 68
  }

  $(startContainer).hide();
  $(gameContainer).append(`<div class="animationApache" id="player"></div>`);
  $(gameContainer).append(`<div class="animationEnemy1" id="enemy1"></div>`);
  $(gameContainer).append(`<div id="enemy2"></div>`);
  $(gameContainer).append(`<div class="animationFriend" id="friend"></div>`);

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
      shot();
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

  function collision() {
    let collisionPlayerEnemy1 = ($("#player").collision($("#enemy1")));

    if (collisionPlayerEnemy1.length > 0) {
      let enemy1X = parseInt($("#enemy1").css("left"));
      let enemy1Y = parseInt($("#enemy1").css("top"));

      explosionOne(enemy1X, enemy1Y);

      positionY = parseInt(Math.random() * 334);
      $("#enemy1").css("left", 694);
      $("#enemy1").css("top", positionY);
    }
  }

  function explosionOne(enemy1X, enemy1Y) {
    $(gameContainer).append(`<div id="explosion"></div>`);
    $("#explosion").css(`background-image`, `url(src/assets/images/explosao.png)`);

    let div =$("#explosion");

    div.css("top", enemy1Y);
    div.css("left", enemy1X);
    div.animate({
      width:200, opacity:0
    }, "slow");

    let timeExplosion = window.setInterval(removeExplosion, 1000);
      function removeExplosion() {
        div.remove();
        window.clearInterval(timeExplosion);
        timeExplosion = null;
      }
    }

  function loop() {
    moveBackground();
    movePlayer();
    moveEnemy1();
    moveEnemy2();
    moveFriend();
    collision();
  }

  function shot() {
    let timeShot;

    if (letsShot === true) {

      letsShot = false;

      let top = parseInt($("#player").css("top"));
      let positionX = parseInt($("#player").css("left"));
      let shotX = positionX + 190;
      let topShot = top + 37;

      $("#game-container").append(`<div id="fire"></div>`);
      $("#fire").css("top", topShot);
      $("#fire").css("left", shotX);

      timeShot = window.setInterval(executeShot, 30);
    }

    function executeShot() {
      let positionX = parseInt($("#fire").css("left"));
      $("#fire").css("left", positionX + 15);

      if (positionX > 900) {
        window.clearInterval(timeShot);
        timeShot = null;
        $("#fire").remove();
        letsShot = true;
      }
    }
  }
  game.timer = setInterval(loop, 30);
}

startContainer.addEventListener("click", start);

kaboom({
  global: true,
  fullscreen: true,
  //rgb: 0-255, kabook: 0-1 alha = 0-1
  clearColor: [0.23, 0.4, 0.8, 1],
  debug: true,
  scale: 1,
});

loadRoot("./sprites/");
//loadSprice(NameOfSubject, 'FILE')
loadSprite("Mario", "mario.png");
loadSprite("block", "block_blue.png");
loadSprite("coin", "coin.png");
loadSprite("surprise", "surprise.png");
loadSprite("evil", "evil_mushroom.png");
loadSprite("unboxed", "unboxed.png");
loadSprite("pipe", "pipe_up.png");
loadSound("jumpSound","jumpSound.mp3");
loadSound("gameSound","gameSound.mp3");


scene("game", () => {
  layers(["bg", "obj", "ui"], "obj");
  play("gameSound")
  const symbolMap = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid()],
    "#": [sprite("surprise"), solid(),'coinSurprise'],
    "!": [sprite("surprise"), solid(),'mushroomSurprise'],
    "$": [sprite("coin")],
    "x":[sprite("unboxed"),solid()]
  };
  
  const map = [
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "          #    #    #    !     #         #                #    ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "                                                               ",
    "===============================================================",
  ];
  const gameLevel = addLevel(map, symbolMap);

  const player = add([
    sprite("Mario"),
     solid (),
    body(),
    pos(40,0),
     origin("bot"),
    ])
    let v = 120

    keyDown('right', () =>{ 
      player.move(v , 0);
       } );

  keyDown('left', () => {
    if(player.pos.x>40)
    player.move(-v,0)
  
  })


  let jump = 500
  keyDown('up', () => { 
    if(player.grounded()){
      play("jumpSound")
    player.jump(jump) 
    }
  })


  player.on("headbump",(obj) =>{
    if(obj.is("coinSurprise"))
    {
      gameLevel.spawn("$",obj.gridPos.sub(0,1))
      destroy(obj)
      gameLevel.spawn("$",obj.gridPos.sub(0,1))

    }

  })



});
start("game");

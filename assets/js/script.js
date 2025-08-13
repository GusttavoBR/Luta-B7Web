let log = new Log(document.querySelector('.log'))

let charKnight = new Knight ("Ragnar")
let charSourcer = new Knight ("Merlin")

let Lmonster = new LittleMonster()
let Bmonster = new BigMonster()


const stage = new Stage(
    charSourcer,
    charKnight,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();

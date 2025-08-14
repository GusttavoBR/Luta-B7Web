class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }
    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 18;
        this.defense = 20;
        this.maxLife = this.life
    }
}

class Sourcer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 29;
        this.defense = 12;
        this.maxLife = this.life
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 8;
        this.defense = 6;
        this.maxLife = this.life
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 10;
        this.maxLife = this.life
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1E1, fighter2E1, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1E1 = fighter1E1;
        this.fighter2E1 = fighter2E1;
        this.log = logObject;

    }

    start() {
        this.update();
        // Botão de atacar
        this.fighter1E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2))

        this.fighter2E1.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1))
    }


        update() {
            // Fighter 1
            this.fighter1E1.querySelector('.name').innerHTML = `${this.fighter1.name} - HP ${this.fighter1.life.toFixed(2)}`;
            let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
            let bar = this.fighter1E1.querySelector('.bar');
            // Remove classes antigas
            bar.classList.remove('full', 'half');
            // Aplica classe conforme a porcentagem de vida
            if (f1Pct >= 80) {
                bar.classList.add('full');
            } else if (f1Pct >= 40) {
                bar.classList.add('half');
            }
            bar.style.width = `${f1Pct.toFixed(2)}%`;



            // Fighter 2
            this.fighter2E1.querySelector('.name').innerHTML = `${this.fighter2.name} - HP ${this.fighter2.life.toFixed(2)}`;
            let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
            let bar2 = this.fighter2E1.querySelector('.bar');
            bar2.classList.remove('full', 'half');
            if (f2Pct >= 99.9) {
                bar2.classList.add('full');
            } else if (f2Pct >= 50) {
                bar2.classList.add('half');
            }
            bar2.style.width = `${f2Pct.toFixed(2)}%`;
        }

        doAttack(attacking, attacked) {
            if(attacking.life === 0 || attacked.life === 0) {
                if (attacking.life === 0) {
                    this.log.addMessage(`${attacking.name} está morto`)
                } else {
                    this.log.addMessage(`${attacked.name}Atacando cachorro morto`)
                }
                
                return
            }

            let attackFactor = (2 * (Math.random() * 2).toFixed(2))
            let defenseFactor = (2 * (Math.random() * 2).toFixed(2))

            let actualAttack = attacking.attack * attackFactor
            let actualDefense = attacked.defense * defenseFactor

            if (actualAttack > actualDefense) {
                attacked.life -= actualAttack;
                this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
            } else {
                this.log.addMessage(`${attacked.name} Conseguiu defender...`)
            }
            this.update()
        }

    }

    class Log {
        list = [];

        constructor(listaEl) {
            this.listaEl = listaEl;
        }

        addMessage(msg) {
            this.list.push(msg);
            this.render();
        }

        render() {
            this.listaEl.innerHTML = '';
            for (let i in this.list) {
                this.listaEl.innerHTML += `<li>${this.list[i]}</li>`
            }
        }
    }
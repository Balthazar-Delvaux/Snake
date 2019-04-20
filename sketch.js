let grid = {
    x: 500, // taille de la grille en pixel
    y: 500, // taille de la grille en pixel
    size: 10, // taille des cases en pixel
};

let game = {
    loseTrigger: () => {game.biteTail(); game.hitwall();},
    loseMessage: () => {alert("Perdu (reload la page pour recommencer)");},
    biteTail: () => {
        for (let i = 1; i < snake.length; i++) {
            if (snake.bodyX[0] === snake.bodyX[i] && snake.bodyY[0] === snake.bodyY[i]) {
                game.loseMessage()
            }
        }

    },

    hitwall: () => {
        if (snake.bodyX[0] > grid.x || snake.bodyY[0] > grid.y || snake.bodyX[0] < 0 || snake.bodyY[0] < 0) {
            game.loseMessage();
        }
    }

}

let snake = {
    bodyX: [50, 40, 30, 20],
    bodyY: [240, 240, 240, 240],
    length: 4,
    directionKeys: "right",
    direction: "right",

    follow: () => {
        for (let i = snake.length; i > 0; i--) {
            snake.bodyX[i] = snake.bodyX[i - 1];
            snake.bodyY[i] = snake.bodyY[i - 1];
            snake.direction[i] = snake.direction[i - 1];
        }
    },

    move: () => {
        snake.direction = snake.directionKeys;
        switch (snake.direction) {
            case "left":
                snake.bodyX[0] -= grid.size;
                break;
            case "up":
                snake.bodyY[0] -= grid.size;
                break;
            case "right":
                snake.bodyX[0] += grid.size;
                break;
            case "down":
                snake.bodyY[0] += grid.size;
                break;
        }
    },

    addTail: () => {
        snake.length++;
        snake.bodyX.splice(1, 0, snake.bodyX[0]);
        snake.bodyY.splice(1, 0, snake.bodyY[0]);
    },

    show: () => {
        fill(150);
        for (let i = 0; i < snake.length; i++) {
            square(snake.bodyX[i], snake.bodyY[i], grid.size);
        }
    },

    checkEat: () => {
        if (rat.bodyX === snake.bodyX[0] && rat.bodyY === snake.bodyY[0]) {
            snake.addTail();
            rat.changeLocation();
        }
    }
};

let rat = {
    bodyX: 400,
    bodyY: 300,

    show: () => {
        square(rat.bodyX, rat.bodyY, grid.size);
    },

    changeLocation: () => {
        rat.bodyX = getRandomInt(grid.x / 10) * grid.size;
        rat.bodyY = getRandomInt(grid.y / 10) * grid.size;
    }
}

function keyPressed() {
    switch (keyCode) {
        case 37: //left
            if (snake.direction != "right") {
                snake.directionKeys = "left";
            }
            break;
        case 38: //up
            if (snake.direction != "down") {
                snake.directionKeys = "up";
            }
            break;
        case 39: //right
            if (snake.direction != "left") {
                snake.directionKeys = "right";
            }
            break;
        case 40: //down
            if (snake.direction != "up") {
                snake.directionKeys = "down";
            }
            break;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function setup() {
    createCanvas(grid.x + 1, grid.y + 1);
    frameRate(8);
    noStroke();
}

function draw() {
    background(0);
    snake.follow(); // le corps suit la tête du snake
    snake.move(); // la tête du snake avance
    game.loseTrigger(); // charge le script
    snake.checkEat(); // vérifie si la tête du snake est sur le rat
    snake.show(); // affiche le snake
    rat.show(); // affiche le rat
}
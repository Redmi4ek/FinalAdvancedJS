let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,1 ,0,0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]
let bricks = [];
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] === 1) {
            bricks.push({x: j*50, y: i*50, width: 50, height: 50});
        }
    }
}
let lives = 2;
let collisionWithMushroom = false;
let invincible = false
const invincibleDuration = 1000;
let background_position = -100;
let balls = [];
let rockyX = 50;
let rockyY = 200;
let rockyDx = 0;
let rockyDy = 0;
let gravity = 1;
let mayJump = true;
let sit = false;
let lookDirection = 'right';
let imageBoyRight = new Image();
imageBoyRight.src = 'png/rocky_right.png';
let imageBoyLeft = new Image();
imageBoyLeft.src = 'png/rocky_left.png';
let imageBoySitRight = new Image();
imageBoySitRight.src = 'png/rocky_sit_right.png';
let imageBoySitLeft = new Image();
imageBoySitLeft.src = 'png/rocky_sit_left.png';
let imageBall = new Image();
imageBall.src = 'png/ball.png';
const Mashrooms = new Image();
Mashrooms.src = 'png/mashroom.png'
const PowerUp = new Image();
PowerUp.src = 'png/powerup.png'
const Heart = new Image();
Heart.src = 'png/heart.png'
const Eheart = new Image();
Eheart.src = 'png/emptyh.png'

const startGame = () => {
    console.log('Game Started');
    setInterval(() => {
        updateGame();
    }, 30);

}
let powerups = []
let star = {
    x:505,
    y:369,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
}

powerups.push(star)
let mushrooms = [];
let mushroom1 = {
    x: 505,
    y: 369,
    width: 30,
    height: 30,
    dx: 3, // скорость по горизонтали
    dy: 0, // скорость по вертикали
};
let mushroom2 = {
    x: 900,
    y: 369,
    width: 30,
    height: 30,
    dx: 2,
    dy: 0,
};
mushrooms.push(mushroom1, mushroom2);


const updateGame = () => {
    let canvas = document.getElementById('rocky'); // Получаем доступ к объекту canvas
    let ctx = canvas.getContext('2d');
    console.log(lives)

    const makeInvincible = () => {
        invincible = true;
        setTimeout(() => {
            invincible = false;
        }, invincibleDuration);
    }

    
    mayJump = false;
    rockyX += rockyDx;
    if (rockyY > 700) {
        rockyX = 50;
        rockyY = 200;
    }

    let draw_position = rockyX - background_position;
    // rockyX - background_position = 600
    if (draw_position > 600) {
        background_position = rockyX - 600;
    } else if (draw_position < 200) {
        background_position = rockyX - 200;
    }

    bricks.forEach((brick, index) => {
        if (rockyX+40 > brick.x && rockyX < brick.x+brick.width && rockyY+50 > brick.y && rockyY < brick.y+brick.height) {
            rockyX = rockyDx > 0 ? brick.x-40 : brick.x+brick.width;
        }
    });

    rockyDy += gravity;
    if (rockyDy > 10)
        rockyDy = 10;
    rockyY += rockyDy;
    bricks.forEach((brick, index) => {
        if (rockyX+40 > brick.x && rockyX < brick.x+brick.width && rockyY+50 > brick.y && rockyY < brick.y+brick.height) {
            if (rockyY < brick.y)
                rockyY = brick.y-50;
            else
                rockyY = brick.y+brick.height;
                rockyDy = 0;
                mayJump = true;
        }
    });
    balls.forEach((ball, index) => {
        ball.dy += gravity;
        if (ball.dy > 20)
            ball.dy = 20;
        ball.x += ball.dx;
        bricks.forEach((brick, index) => {
            let intersects = false;
            if (ball.x < brick.x + brick.width && ball.x > brick.x && ball.y < brick.y + brick.height && ball.y > brick.y) {
                intersects = true;
            }
            if (ball.x+20 < brick.x + brick.width && ball.x+20 > brick.x && ball.y < brick.y + brick.height && ball.y > brick.y) {
                intersects = true;
            }
            if (ball.x+20 < brick.x + brick.width && ball.x+20 > brick.x && ball.y+20 < brick.y + brick.height && ball.y+20 > brick.y) {
                intersects = true;
            }
            if (ball.x < brick.x + brick.width && ball.x > brick.x && ball.y+20 < brick.y + brick.height && ball.y+20 > brick.y) {
                intersects = true;
            }
            if (intersects) {
                if (ball.x + 20 > brick.x && ball.x < brick.x + brick.width) {
                    ball.x -= ball.dx;
                    ball.dx = -ball.dx/1.3;
                }
            }
            mushrooms.forEach((mushroom, Index) => {
                if (ball.x + 20 >= mushroom.x && 
                    ball.x <= mushroom.x + mushroom.width && 
                    ball.y + 20 >= mushroom.y && 
                    ball.y <= mushroom.y + mushroom.height) {
                    // Если мяч касается гриба, убираем гриб из массива грибов
                    mushrooms.splice(Index, 1);
                    // Убираем мяч из массива 
                    balls.splice(Index, 1);
                }
            });

        });
        ball.y += ball.dy;
        bricks.forEach((brick, index) => {
            let intersects = false;
            if (ball.x < brick.x + brick.width && ball.x > brick.x && ball.y < brick.y + brick.height && ball.y > brick.y) {
                intersects = true;
            }
            if (ball.x+20 < brick.x + brick.width && ball.x+20 > brick.x && ball.y < brick.y + brick.height && ball.y > brick.y) {
                intersects = true;
            }
            if (ball.x+20 < brick.x + brick.width && ball.x+20 > brick.x && ball.y+20 < brick.y + brick.height && ball.y+20 > brick.y) {
                intersects = true;
            }
            if (ball.x < brick.x + brick.width && ball.x > brick.x && ball.y+20 < brick.y + brick.height && ball.y+20 > brick.y) {
                intersects = true;
            }
            if (intersects) {
                if (ball.y + 20 > brick.y && ball.y < brick.y + brick.height) {
                    ball.y -= ball.dy;
                    ball.dy = -ball.dy/1.3;
                }
            }
        });

    });

    mushrooms.forEach((mushroom, index) => {
        mushroom.x += mushroom.dx;
        mushroom.y += mushroom.dy;

        bricks.forEach((brick) => {
            if (mushroom.x + mushroom.width >= brick.x && 
                mushroom.x <= brick.x + brick.width && 
                mushroom.y + mushroom.height >= brick.y && 
                mushroom.y <= brick.y + brick.height) {
                mushroom.dx = -mushroom.dx;
                mushroom.dy = -mushroom.dy;
            } 
                // mushroom.dy = 3

        });
        
        if (rockyX + 40 >= mushroom.x && 
            rockyX <= mushroom.x + mushroom.width && 
            rockyY + 50 >= mushroom.y && 
            rockyY <= mushroom.y + mushroom.height) {
                if (!invincible){
                lives--;
                makeInvincible()
                }
                
        }
        
    });
    if (lives === 0){
            rockyX = 50;
            rockyY = 200;
            lives = 1
        }    
    
    powerups.forEach((powerup, index) => {
        if (rockyX + 40 >= powerup.x && 
            rockyX <= powerup.x + powerup.width && 
            rockyY + 50 >= powerup.y && 
            rockyY <= powerup.y + powerup.height) {
                lives++
                powerups.splice(index, 1);
            }
    });
    // drawLives();
    drawGame();
};

// const drawLives = () => {
//     let canvas = document.getElementById('rocky'); 
//     let ctx = canvas.getContext('2d');



//     // let x = canvas.width - (heartWidth + spacing) * 2; 
//     // let y = 100; 

//     // Отрисовка жизней
    
// };


const drawGame = () => {
    let canvas = document.getElementById('rocky');
    // draw ball
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(imageBall, 10, 10, 50, 50);
    // draw rocky

    if (lookDirection === 'right') {
        if (sit)
            ctx.drawImage(imageBoySitRight, rockyX - background_position, rockyY+20, 40, 30);
        else
            ctx.drawImage(imageBoyRight, rockyX - background_position, rockyY, 40, 50);
    } else {
        if (sit)
            ctx.drawImage(imageBoySitLeft, rockyX - background_position, rockyY+20, 40, 30);
        else
            ctx.drawImage(imageBoyLeft, rockyX - background_position, rockyY, 40, 50);
    }
    // draw balls
    balls.forEach((ball, index) => {
        ctx.drawImage(imageBall, ball.x - background_position, ball.y, 20, 20);
    });

    // draw bricks
    bricks.forEach((brick, index) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(brick.x - background_position, brick.y, brick.width, brick.height);
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.moveTo(brick.x - background_position, brick.y+brick.height/3);
        ctx.lineTo(brick.x - background_position+brick.width, brick.y+brick.height/3);
        ctx.moveTo(brick.x - background_position, brick.y+2*brick.height/3);
        ctx.lineTo(brick.x - background_position+brick.width, brick.y+2*brick.height/3);
        ctx.moveTo(brick.x - background_position+brick.width/3, brick.y);
        ctx.lineTo(brick.x - background_position+brick.width/3, brick.y+brick.height/3);
        ctx.moveTo(brick.x - background_position+2*brick.width/3, brick.y);
        ctx.lineTo(brick.x - background_position+2*brick.width/3, brick.y+brick.height/3);
        ctx.stroke();
    });
    // грибыч
    mushrooms.forEach((mushroom, index) => {
    ctx.drawImage(Mashrooms, mushroom.x - background_position, mushroom.y, mushroom.width, mushroom.height);
    });
    // паверапыч
    powerups.forEach((powerup, index) => {
    ctx.drawImage(PowerUp, powerup.x - background_position, powerup.y, powerup.width, powerup.height);
    });

    let heartWidth = 100; 
    let heartHeight = 100; 
    let spacing = 10; 
    for (let i = 0; i < lives; i++) {
        if (lives > 2){
        ctx.drawImage(Heart, 1200, 20, heartWidth, heartHeight);
        ctx.drawImage(Heart, 1300, 20, heartWidth, heartHeight);
        }
        if (condition) {
            
        } else {
            
        }
    }
   
    for (let i = lives; i < 2; i++) {
        ctx.drawImage(Eheart, 1300, 50, 45, 45);
        // x += heartWidth + spacing;
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        rockyDx = 7;
        lookDirection = 'right';
    } else if (event.key === 'ArrowLeft') {
        rockyDx = -7;
        lookDirection = 'left';
    } else if (event.key === 'ArrowUp' && mayJump) {
        rockyDy = -15;
    } else if (event.key === 'ArrowDown') {
        rockyDy = 5;
        sit = true;
    } else if (event.key === ' ') {
        let ballDx = 10;
        if (lookDirection === 'left')
            ballDx = -10;
        balls.push({x: rockyX, y: rockyY, dx: ballDx, dy: -10});
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        rockyDx = 0;
    }
    if (event.key === 'ArrowDown') {
        sit = false;
    }
});

startGame();
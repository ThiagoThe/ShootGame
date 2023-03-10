 // Declare as variáveis ​​que você vai usar
 let canvas, ctx, player, enemy, bullets;

 // Inicialize o jogo quando o documento estiver pronto
 document.addEventListener("DOMContentLoaded", function () {
   // Obtenha o elemento canvas e o contexto de desenho
   canvas = document.getElementById("game-canvas");
   ctx = canvas.getContext("2d");

   // Crie o jogador e o inimigo
   player = new Player(canvas.width / 2, canvas.height - 50);
   enemy = new Enemy(canvas.width / 2, 50);

   // Inicialize a lista de balas
   bullets = [];

   // Inicie o loop principal do jogo
   requestAnimationFrame(gameLoop);
 });

 // Defina a classe do jogador
 class Player {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.width = 20;
     this.height = 20;
     this.speed = 5;
     this.color = "blue";
   }

   draw() {
     ctx.fillStyle = this.color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   move(direction) {
     if (direction === "left" && this.x > 0) {
       this.x -= this.speed;
     } else if (
       direction === "right" &&
       this.x < canvas.width - this.width
     ) {
       this.x += this.speed;
     }
   }
 }

 // Defina a classe do inimigo
 class Enemy {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.width = 20;
     this.height = 20;
     this.speed = 2;
     this.color = "red";
   }

   draw() {
     ctx.fillStyle = this.color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   move() {
     this.x += this.speed;
     if (this.x > canvas.width - this.width || this.x < 0) {
       this.speed *= -1;
     }
   }
 }

 // Defina a classe da bala
 class Bullet {
   constructor(x, y) {
     this.x = x;
     this.y = y;
     this.width = 5;
     this.height = 5;
     this.speed = 10;
     this.color = "black";
   }

   draw() {
     ctx.fillStyle = this.color;
     ctx.fillRect(this.x, this.y, this.width, this.height);
   }
 }

 // Atualize o estado do jogo em cada frame
 function update() {
   // Atualize a posição do inimigo
   enemy.move();

   // Atualize a posição das balas
   bullets.forEach(function (bullet) {
     bullet.y -= bullet.speed;
   });
 }

 // Desenhe o jogo na tela
 function draw() {
   // Limpe o canvas
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   // Desenhe o jogador
   player.draw();

   // Desenhe o inimigo
   enemy.draw();

   // Desenhe as balas
   bullets.forEach(function (bullet) {
     bullet.draw();
   });
 }

 // Verifique se houve colisão entre o inimigo e as balas
 function checkCollision() {
   bullets.forEach(function (bullet) {
     if (
       bullet.x > enemy.x &&
       bullet.x < enemy.x + enemy.width &&
       bullet.y < enemy.y + enemy.height
     ) {
       // Se houve colisão, remova a bala e o inimigo
       bullets.splice(bullets.indexOf(bullet), 1);
       enemy = new Enemy(canvas.width / 2, 50);
       // Incremente a pontuação do jogador
       let score = document.getElementById("score");
       score.innerHTML =
         "Score: " + (parseInt(score.innerHTML.split(":")[1]) + 1);
     }
   });
 }

 // O loop principal do jogo
 function gameLoop() {
   update();
   draw();
   checkCollision();
   requestAnimationFrame(gameLoop);
 }
 // Adicione um manipulador de cliques ao botão "Move left"
 document
   .getElementById("left-button")
   .addEventListener("click", function () {
     player.move("left");
   });

 // Adicione um manipulador de cliques ao botão "Move right"
 document
   .getElementById("right-button")
   .addEventListener("click", function () {
     player.move("right");
   });

 // Adicione um manipulador de cliques ao botão "Shoot"
 document
   .getElementById("shoot-button")
   .addEventListener("click", function () {
     // Adicione uma nova bala à lista de balas
     bullets.push(new Bullet(player.x, player.y));
   });
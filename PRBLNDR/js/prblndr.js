//classe main - por enquanto vai estar aqui toda a bagunça seguida no tutorial
var canvas, ctx, ALTURA, LARGURA, COMBUSTIVEL_MAX=100, COMBUSTIVEL, frames = 0,
chao = {
  //isso virará uma classe no futuro
  y: 550,
  altura: 50,
  cor: "#95a5a6",

  desenha: function(){
    ctx.fillStyle = this.cor;
    ctx.fillRect(0, this.y,LARGURA,this.altura);
  }
},

bloco = {
  altura: 10,
  largura: 10,
  x: 295,
  y: 15,
  cor: "#f1c40f",
  gravidade: 0.3,
  velocidadeY: 0,
  thrustUp: 0,
  thrustUp_power: 0.5,
  vento: 0,
  velocidadeX: 0,
  thrustSideways: 0,
  thrustSideways_power: 0.2,

  atualiza: function () {
    this.velocidadeY += this.gravidade-this.thrustUp;
    this.y += this.velocidadeY;
    this.velocidadeX += this.vento-this.thrustSideways;
    this.x += this.velocidadeX;
    COMBUSTIVEL -= this.thrustUp + Math.abs(this.thrustSideways);

    if (this.y > chao.y - this.altura) {
      this.y = chao.y - this.altura;
      this.velocidadeY = 0;
      this.velocidadeX = 0;
    }
  },

  desenha: function () {
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
  }

}
;

function pressy(event){
  switch (event.key) {
    case "ArrowUp":
      bloco.thrustUp = bloco.thrustUp_power;
      bloco.cor="#00f";
      break;
    case "ArrowRight":
      bloco.thrustSideways = -bloco.thrustSideways_power;
      bloco.cor="#f00";
      break;
    case "ArrowLeft":
      bloco.thrustSideways = bloco.thrustSideways_power;
      bloco.cor="#0f0";
      break;
    default:

  }
}

function release(event){
  switch (event.key) {
    case "ArrowUp":
      bloco.thrustUp = 0;
      bloco.cor="#f1c40f";
      break;
    case "ArrowRight":
      bloco.thrustSideways = 0;
      bloco.cor="#f1c40f";
      break;
    case "ArrowLeft":
      bloco.thrustSideways = 0;
      bloco.cor="#f1c40f";
      break;
    default:

  }
}

function roda() {
  atualiza();
  desenha();

  window.requestAnimationFrame(roda);
}

function atualiza() {
  frames++;
  bloco.atualiza();
  document.getElementById("ySpeedValue").innerHTML = bloco.velocidadeY.toFixed(2)+'ms';
  document.getElementById("xSpeedValue").innerHTML = bloco.velocidadeX.toFixed(2)+'ms';
  document.getElementById("windValue").innerHTML = bloco.vento.toFixed(2)+'ms';
  document.getElementById("gravityValue").innerHTML = bloco.gravidade.toFixed(2)+'G';
  document.getElementById("fuelValue").innerHTML = COMBUSTIVEL.toFixed(2)+'l | '+((COMBUSTIVEL/COMBUSTIVEL_MAX)*100).toFixed(2)+'%';
  document.getElementById("fuelLevel").style.width = Math.abs(((COMBUSTIVEL/COMBUSTIVEL_MAX)*100).toFixed(2))+'%'; 
}

function desenha() {
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(0,0,LARGURA,ALTURA);
  chao.desenha();
  bloco.desenha();
}

function main(){
  ALTURA = window.innerHeight;
  LARGURA = window.innerWidth;

  if (LARGURA >= 500){
    LARGURA = 600;
    ALTURA = 600;
  }

  COMBUSTIVEL = COMBUSTIVEL_MAX;

  canvas = document.createElement("canvas");
  canvas.width = LARGURA;
  canvas.height = ALTURA;

  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  document.addEventListener("keydown",pressy);
  document.addEventListener("keyup",release);

  roda();

}




//inicializa o jogo
main();

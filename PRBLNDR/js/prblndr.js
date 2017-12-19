//classe main - por enquanto vai estar aqui toda a bagunça seguida no tutorial
var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3,
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
  x: 0,
  y: -15,
  altura: 10,
  largura: 10,
  cor: "#f1c40f",
  gravidade: 0.3,
  velocidade: 0,
  forcaDoPulo: 15,
  thrust: 0,
  thrust_power: 0.5,
  qtdPulos: 0,

  atualiza: function () {
    this.velocidade += this.gravidade-this.thrust;
    this.y += this.velocidade;

    if (this.y > chao.y - this.altura) {
      this.y = chao.y - this.altura;
      this.qtdPulos = 0;
      this.velocidade = 0;
    }
  },

  pula: function () {
    if (this.qtdPulos < maxPulos) {
      this.qtdPulos++;
      this.velocidade = -this.forcaDoPulo;
    }
  },

  desenha: function () {
    this.x =(LARGURA/2)-(this.largura/2);
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
  }

}
;

function pressy(event){
  bloco.thrust = bloco.thrust_power;
}

function release(event){
  bloco.thrust = 0;
}

function roda() {
  atualiza();
  desenha();

  window.requestAnimationFrame(roda);
}

function atualiza() {
  frames++;

  bloco.atualiza();
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

  canvas = document.createElement("canvas");
  canvas.width = LARGURA;
  canvas.height = ALTURA;

  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  document.addEventListener("mousedown",pressy);
  document.addEventListener("mouseup",release);

  roda();

}




//inicializa o jogo
main();

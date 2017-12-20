//classe main - por enquanto vai estar aqui toda a bagunça seguida no tutorial
var canvas, ctx, ALTURA, LARGURA, frames = 0, maxPulos = 3,
chao = {
  //isso virará uma classe no futuro
  y: 550,
  altura: 50,
  cor: "#ffdf70",

  desenha: function(){
    ctx.fillStyle = this.cor;
    ctx.fillRect(0, this.y,LARGURA,this.altura);
  }
},

bloco = {
  x: 0,
  y: -50,
  altura: 50,
  largura: 50,
  cor: "#ff4e4e",
  gravidade: 1.5,
  velocidade: 0,
  forcaDoPulo: 15,
  qtdPulos: 0,

  atualiza: function () {
    this.velocidade += this.gravidade;
    this.y += this.velocidade;

    if (this.y > chao.y - this.altura) {
      this.y = chao.y - this.altura;
      this.qtdPulos = 0;
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

obstaculos = {
  _obs: [],
  cores: ["#ffbc1c","#ff1c1c","#ff85e1","#52a7ff","#78ff5d"],
  insere: function() {
    this._obs.push({
      x: 200,//LARGURA,
      largura: 30 + Math.floor(21 * Math.random()),
      altura: 30 + Math.floor(120 * Math.random()),
      cor: this.cores[Math.floor(5 * Math.random())]
    });
  },

  atualiza: function(){

  },

  desenha: function(){
    for (var i = 0, tam = this._obs.length;i<tam;i++){
      var obs = this._obs[i];
      ctx.fillStyle = obs.cor;
      ctx.fillRect(obs.x,chao.y - obs.altura, obs.largura, obs.altura);
    }
  }
}

function clique(event){
  bloco.pula();
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
  ctx.fillStyle = "#50beff";
  ctx.fillRect(0,0,LARGURA,ALTURA);
  chao.desenha();
  obstaculos.desenha();
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
  document.addEventListener("mousedown",clique);

  roda();

}




//inicializa o jogo
main();

const sky = document.querySelector("#sky");
const balloon = document.querySelector("#balloon");
const score = document.querySelector("#score");

const ITEM = "🎈";

let currentAnimation;
let points = 0;
let speedIncrease = 0;

function run() {
  //extraigo tamaño de la ventana del navegador
  const { innerHeight, innerWidth } = window;

  //pongo el globo en opacidad 1
  balloon.style.opacity = 1;

  //escribo contenido del globo
  balloon.textContent = ITEM;

  //redimensiono el tamaño del globo
  balloon.style.fontSize = `${4 + Math.random() * 4}rem`;

  //calculo el ancho del globo
  const { width } = balloon.getBoundingClientRect();

  //calcular coordenadas de animacion
  const x = Math.random() * (innerWidth - width);
  const y = innerHeight;

  currentAnimation = balloon.animate(
    [
      { transform: `translate(${x}px, ${y}px)` },
      { transform: `translate(${x}px, 0px)` },
    ],
    {
      duration: 5000 - speedIncrease,
      fill: "both",
    }
  );

  currentAnimation.onfinish = endGame;
}

function endGame() {
  //cambiamos el icono del globo
  balloon.textContent = "💥";

  //cambiamos texto del score
  score.textContent = `Salvaste ${points} ${ITEM}. Recarga para volver a jugar.`;
}

function handleBallonClick() {
  //aumentamos puntuación
  points++;

  //escribimos puntos en el scoreboard
  score.textContent = `${points} ✨`;

  //pausamos la animacion
  currentAnimation.pause();

  //cambiamos icono y opacidad del globo
  balloon.textContent = "✨";
  balloon.style.opacity = 0;

  //aumentamos la velocidad del siguiente globo
  speedIncrease += 50;

  //lanzamos un nuevo globo después de un retardo
  setTimeout(run, 500);
}

//hacemos que cuando cliquemos el globo ejecute la funcion anterior
balloon.addEventListener("click", handleBallonClick);

run();

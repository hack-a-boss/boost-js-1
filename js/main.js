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

  //añado una nube
  addCloud();

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

  //hacemos que si la animación finaliza se acabe la partida
  currentAnimation.onfinish = endGame;
}

function addCloud() {
  //creamos un spam, añadimos una class y un icono de nube
  const cloud = document.createElement("span");
  cloud.classList.add("cloud");
  cloud.textContent = "☁";

  //establecemos tamaño y posición de la nube
  cloud.style.fontSize = `${2 + Math.random() * 30}rem`;
  cloud.style.top = `${100 * Math.random()}vh`;
  cloud.style.left = `${100 * Math.random()}vw`;

  //añadimos la nube al cielo
  sky.append(cloud);
}

function endGame() {
  //cambiamos el icono del globo
  balloon.textContent = "💥";

  //cambiamos texto del score
  score.textContent = `Salvaste ${points} ${ITEM}. Recarga para volver a jugar.`;
}

function handleBallonClick() {
  if (balloon.textContent !== ITEM) return;

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

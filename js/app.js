const REFRESH_INTERVAL = 10;

let body;
let canvas;
const mashList = [];

init();

function init() {
  body = document.querySelector('body');
  canvas = document.getElementById('canvas');

  updateCanvasSize(body, canvas);
  window.addEventListener('resize', () => { updateCanvasSize(body, canvas)});

  createMashes();
  setInterval(draw, REFRESH_INTERVAL);
}

function updateCanvasSize() {
  if (!canvas || !body) return;

  canvas.setAttribute('width', body.getBoundingClientRect().width + 'px');
  canvas.setAttribute('height', body.getBoundingClientRect().height + 'px');
}

function createMashes() {
  const circle = {
    type: 'circle',
    x: 200,
    y: 200,
    r: 10,
    color: '#0095DD',
    speed: 2,
    directionX: 'right',
    directionY: 'bottom',
  };
  mashList.push(circle);
}

function draw() {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const mash of mashList) {
    renderMash(mash);

    if (mash.x + mash.speed > canvas.width || mash.x - mash.speed < 0) {
      if (mash.directionX === 'right') mash.directionX = 'left';
      else if (mash.directionX === 'left') mash.directionX = 'right';
    } 
    
    if (mash.y + mash.speed > canvas.height || mash.y - mash.speed < 0) {
      if (mash.directionY === 'bottom') mash.directionY = 'top';
      else if (mash.directionY === 'top') mash.directionY = 'bottom';
    } 

    if (mash.directionX === 'right') {
      mash.x += mash.speed;
    } else {
      mash.x -= mash.speed;
    }

    if (mash.directionY === 'bottom') {
      mash.y += mash.speed;
    } else {
      mash.y -= mash.speed;
    }
  }

  ctx.beginPath();
  ctx.rect(20, 40, 50, 50);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.rect(160, 10, 100, 40);
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  ctx.stroke();
  ctx.closePath();
}

function renderMash(mash) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(mash.x, mash.y, mash.r, 0, Math.PI * 2);
  ctx.fillStyle = mash.color;
  ctx.fill();
  ctx.closePath();
}
<template>
  <canvas ref="canvas" class="background-canvas"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const canvas = ref(null);
let ctx = null;
let bears = [];
let running = true;

const BEAR_COUNT = 36;
const bearImg = new Image();
bearImg.src = "./Teddy_2.png";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function resize() {
  const c = canvas.value;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
}

function draw() {
  if (!running) return;

  const c = canvas.value;
  ctx.clearRect(0, 0, c.width, c.height);

  for (const b of bears) {
    b.vx += rand(-0.002, 0.002);
    b.vy += rand(-0.002, 0.002);

    b.vx = Math.max(Math.min(b.vx, b.maxSpeed), -b.maxSpeed);
    b.vy = Math.max(Math.min(b.vy, b.maxSpeed), -b.maxSpeed);

    b.x += b.vx;
    b.y += b.vy;

    if (b.x > c.width + b.size) b.x = -b.size;
    if (b.x < -b.size) b.x = c.width + b.size;
    if (b.y > c.height + b.size) b.y = -b.size;
    if (b.y < -b.size) b.y = c.height + b.size;

    b.angle += b.rotateSpeed;

    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle);
    ctx.drawImage(bearImg, -b.size / 2, -b.size / 2, b.size, b.size);
    ctx.restore();
  }

  requestAnimationFrame(draw);
}

onMounted(() => {
  const c = canvas.value;
  ctx = c.getContext("2d");

  resize();
  window.addEventListener("resize", resize);

  bearImg.onload = () => {
    for (let i = 0; i < BEAR_COUNT; i++) {
      const size = rand(35, 120);

      bears.push({
        x: rand(0, canvas.value.width),
        y: rand(0, canvas.value.height),
        size,
        vx: rand(-0.3, 0.3),
        vy: rand(-0.3, 0.3),
        maxSpeed: rand(0.36, 0.56),
        angle: rand(0, Math.PI * 2),
        rotateSpeed: rand(-0.003, 0.003),
      });
    }
    draw();
  };
});

onBeforeUnmount(() => {
  running = false;
  window.removeEventListener("resize", resize);
  bears.length = 0;
});
</script>

<style scoped>
.background-canvas {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>

<template>
  <div class="footer-container">
    <div class="footer-box">
      <h4>Teddy UI</h4>
      <p>个人组件库展示 · © 2025</p>

      <div class="links">
        <a href="https://github.com/yourname/yourrepo" target="_blank">GitHub</a>
        <a href="#">文档</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
}

.footer-box {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  padding: 32px;
  box-sizing: border-box;
}

.links a {
  margin-right: 20px;
  color: #333;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.links a:hover {
  opacity: 1;
}
</style>



<template>
  <header class="auth-header">
    <img
      src="https://auth.openai.com/assets/openai-logo-DmWoKcI3.svg"
      alt=""
    />
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;

  & img {
    display: flex;
    height: 32px;
    width: 32px;
    background-color: #fff;
    padding: 32px 0 0;
    fill: #202123;
  }
}
</style>

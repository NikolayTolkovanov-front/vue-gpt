<template>
  <div class="auth-wrapper">
    <AuthHeader />
    <AuthMain />
    <AuthFooter />
  </div>
</template>

<script setup lang="ts">
import AuthFooter from '@/components/Auth/AuthFooter.vue'
import AuthHeader from '@/components/Auth/AuthHeader.vue'
import AuthMain from '@/components/Auth/AuthMain.vue'
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  font-family:
    Söhne,
    -apple-system,
    BlinkMacSystemFont,
    Helvetica,
    sans-serif;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatHeader from '@/components/Chat/ChatHeader.vue'
import ChatFooter from '@/components/Chat/ChatFooter.vue'
import ChatAside from '@/components/Chat/ChatAside.vue'
import { onMounted, ref } from 'vue'

const newQuestion = ref({})
const newAnswer = ref({})

function getPrompt(prompt) {
  newQuestion.value = prompt.newQuestion
  newAnswer.value = prompt.newAnswer
}
</script>

<template>
  <div class="wrapper">
    <ChatAside />
    <main class="main">
      <ChatHeader />

      <RouterView v-slot="{ Component }">
        <component
          :is="Component"
          :new-question="newQuestion"
          :new-answer="newAnswer"
        ></component>
      </RouterView>

      <ChatFooter @send-prompt="getPrompt" />
    </main>
  </div>
</template>

<style scoped></style>

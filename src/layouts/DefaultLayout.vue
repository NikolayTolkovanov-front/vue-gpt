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

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatHeader from '@/components/Chat/ChatHeader.vue'
import ChatFooter from '@/components/Chat/ChatFooter.vue'
import ChatAside from '@/components/Chat/ChatAside.vue'
import { ref } from 'vue'

import type { NewMessage } from '@/interfaces/stores/chats'

const newQuestion = ref({})
const newAnswer = ref({})

function getPrompt(response: NewMessage) {
  newQuestion.value = response.newQuestion
  newAnswer.value = response.newAnswer
}
</script>

<style lang="scss" scoped></style>

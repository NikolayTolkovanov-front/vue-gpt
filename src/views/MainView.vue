<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="scroll-container">
    <div class="container">
      <div
        class="messages"
        ref="messages"
      >
        <div
          class="messages__message-wrapper"
          v-for="item of formattedMessages"
        >
          <article class="message question">
            <div
              class="change-question"
              :class="{ hidden: !item.question.hidden }"
            >
              <div class="change-question__text">
                <textarea
                  class="change-question__textarea"
                  name=""
                  v-model="item.question.changeQuestionValue"
                ></textarea>
              </div>
              <div class="change-question__btns">
                <button
                  @click="toggleChangeQuestion(item.question.id)"
                  class="change-question__btn btn-escape"
                >
                  Отменить
                </button>
                <button
                  :disabled="!item.question.changeQuestionValue"
                  @click="regenerateQuestion(item.question.changeQuestionValue, item.question.id)"
                  class="change-question__btn btn-submit"
                >
                  Отправить
                </button>
              </div>
            </div>
            <div
              class="question__body"
              :class="{ hidden: item.question.hidden }"
            >
              <button
                @click="toggleChangeQuestion(item.question.id)"
                class="question__change-btn"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                  ></path>
                </svg>
              </button>
              <p class="question__message-text">
                <div v-if="item.question.filename" class="question__file">
                  <p class="question__file-title">Имя файла:</p>
                  <p class="question__file-name">{{ item.question.filename }}</p>
                  <div class="divider"></div>
                </div>
                {{ item.question.message }}
              </p>
            </div>
          </article>
          <article class="message answer">
            <div class="answer__icon">
              <img
                :src="chatsStore.getImgPathByModel(item.answer.model)"
                alt="GPT"
              />
            </div>
            <div class="answer__content">
              <p class="answer__message-text">{{ item.answer.message }}</p>
              <div class="answer__btns">
                <button
                  @click="copyText(item.answer.message)"
                  class="answer__btn copy-text-btn"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                    ></path>
                  </svg>
                </button>
                <button
                :disabled="!chatsStore.currentModel.length"
                  @click="regenerateAnswer(item.answer.message)"
                  class="answer__btn regenerate-text-btn"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.06957 10.8763C3.62331 6.43564 7.40967 3 12 3C14.2824 3 16.4028 3.85067 18.0118 5.25439V4C18.0118 3.44772 18.4595 3 19.0118 3C19.5641 3 20.0118 3.44772 20.0118 4V8C20.0118 8.55228 19.5641 9 19.0118 9H15C14.4477 9 14 8.55228 14 8C14 7.44772 14.4477 7 15 7H16.9571C15.6757 5.76379 13.9101 5 12 5C8.43108 5 5.48466 7.67174 5.0542 11.1237C4.98586 11.6718 4.48619 12.0607 3.93815 11.9923C3.39011 11.924 3.00123 11.4243 3.06957 10.8763ZM20.0618 12.0077C20.6099 12.076 20.9988 12.5757 20.9304 13.1237C20.3767 17.5644 16.5903 21 12 21C9.72322 21 7.60762 20.1535 5.99999 18.7559V20C5.99999 20.5523 5.55228 21 4.99999 21C4.44771 21 3.99999 20.5523 3.99999 20V16C3.99999 15.4477 4.44771 15 4.99999 15H8.99999C9.55228 15 9.99999 15.4477 9.99999 16C9.99999 16.5523 9.55228 17 8.99999 17H7.04285C8.32433 18.2362 10.0899 19 12 19C15.5689 19 18.5153 16.3283 18.9458 12.8763C19.0141 12.3282 19.5138 11.9393 20.0618 12.0077Z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatsStore } from '@/stores/chats'
import { useTemplateRef, onMounted, ref, watch, nextTick, defineProps, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  newQuestion: {
    type: Object,
    default: () => {}
  },
  newAnswer: {
    type: Object,
    default: () => {}
  }
})
const chatsStore = useChatsStore()

const route = useRoute()
const router = useRouter()

const messagesContainer = useTemplateRef('messages')
const questions: Ref<Array> = ref([])
const answers: Ref<Array> = ref([])
const formattedMessages: Ref<Array> = ref([])

function scrollToLastMessage() {
  const messagesList = messagesContainer.value?.children

  if (messagesContainer && messagesList?.length) {
    const lastMessage = messagesList[messagesList.length - 1]

    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function toggleChangeQuestion(questionId: number) {
  console.log('questionId', questionId)
  const indexQuestion = formattedMessages.value.findIndex((pair) => {
    return pair.question.id === questionId
  })
  console.log('indexQuestion', indexQuestion)
  formattedMessages.value[indexQuestion].question.hidden =
    !formattedMessages.value[indexQuestion].question.hidden
}

function copyText(text: string) {
  if (navigator.clipboard) navigator.clipboard?.writeText(text)
}

async function getChat(chatId: number) {
  const chat = await chatsStore.getChat(chatId).catch(() => router.push('/'))

  formattedMessages.value = []

  answers.value = chat.answers
  questions.value = chat.questions

  console.log('answers.value', answers.value)
  console.log('questions.value', questions.value)

  const maxLength = Math.max(answers.value.length, questions.value.length)

  for (let i = 0; i < maxLength; i++) {
    const obj = {}

    if (i < questions.value.length) {
      const question = questions.value[i]
      question.hidden = false
      question.changeQuestionValue = ref('')
      obj.question = question
    }
    if (i < answers.value.length) {
      const answer = answers.value[i]
      obj.answer = answer
    }
    formattedMessages.value.push(obj)
  }
}

async function regenerateQuestion(prompt: string, questionId: number) {
  await chatsStore.sendPrompt(prompt, Number(route.params['id'])).then((res) => {
    console.log('here', res)

    const { newQuestion, newAnswer } = res
    console.log('newQuestion, newAnswer', newQuestion, newAnswer)

    newQuestion.hidden = false
    newQuestion.changeQuestionValue = ref('')
    formattedMessages.value.push({ question: newQuestion, answer: newAnswer })
  })
  toggleChangeQuestion(questionId)
  scrollToLastMessage()
}

async function regenerateAnswer(prompt: string) {
  await chatsStore.sendPrompt(prompt, Number(route.params['id'])).then((res) => {
    console.log('here', res)

    const { newQuestion, newAnswer } = res
    console.log('newQuestion, newAnswer', newQuestion, newAnswer)

    newQuestion.hidden = false
    newQuestion.changeQuestionValue = ref('')
    formattedMessages.value.push({ question: newQuestion, answer: newAnswer })
  })
  scrollToLastMessage()
}

watch(props, () => {
  const question = props.newQuestion
  const answer = props.newAnswer

  question.hidden = false
  question.changeQuestionValue = ref('')

  answer.model = chatsStore.currentModel
  formattedMessages.value.push({ question, answer })
  nextTick(() => scrollToLastMessage())
})

watch(
  () => route.params['id'],
  async (newId) => {
    await getChat(Number(newId))
    nextTick(() => scrollToLastMessage())
  }
)

onMounted(async () => {
  await chatsStore.getChats()

  const chats = chatsStore.chats

  if (!chats.length) {
    console.log('no chats')
    if (route.params['id']) {
      router.push('/')
    }
    return
  }
  await getChat(Number(route.params['id'])).catch(() => router.push('/'))

  nextTick(() => scrollToLastMessage())
})
</script>

<style lang="scss" scoped>
.scroll-container {
  overflow: auto;
  scrollbar-color: $ternary transparent;
  flex-grow: 1;
}

.messages {
  display: flex;
  flex-direction: column;

  &__message-wrapper:not(:last-child) {
    .regenerate-text-btn {
      display: none;
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
    }
  }

  .message {
    width: 100%;
    padding: 18px 0;
  }

  .question {
    display: flex;
    flex-direction: column;

    &__body {
      display: flex;
      align-items: center;
      justify-content: end;
      gap: 10px;

      &:hover {
        .question__change-btn {
          display: flex;
        }
      }

      &.hidden {
        display: none;
      }
    }

    .divider {
      display: block;
      width: 100%;
      height: 1px;
      margin: 4px 0;
      background-color: $primary;
    }

    &__change-btn {
      width: 36px;
      height: 36px;
      flex: 0 0 36px;
      border-radius: 9999px;
      justify-content: center;
      align-items: center;
      transition: background-color 0.1s;
      display: none;

      &:hover {
        background-color: $ternary;
      }

      & svg {
        width: 18px;
        height: 18px;
        fill: $primary;
      }
    }

    &__message-text {
      max-width: 70%;
      padding: 10px 20px;
      background-color: #2f2f2f;
      white-space: pre-wrap;
      color: $primary;
      border-radius: 24px;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
    }
  }

  .change-question {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 24px;
    background-color: $ternary;
    padding: 12px;

    &.hidden {
      display: none;
    }

    &__text {
      max-height: 25dvh;
      overflow: auto;
      display: grid;
      margin: 8px;
      scrollbar-color: #676767 transparent;
    }

    &__textarea {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 2;
      width: 100%;
      resize: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: transparent;
      border: none;
      color: $primary;
    }

    &__btns {
      display: flex;
      gap: 8px;
      justify-content: end;

      .btn-escape {
        background-color: $secondary;
        color: $primary;

        &:hover {
          background-color: #2f2f2f;
        }
      }

      .btn-submit {
        background-color: rgb(249, 249, 249);
        color: $secondary;
        transition: 0.2s;

        &:disabled {
          opacity: 0.5;
        }

        &:hover {
          background-color: $primary;
        }
      }
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: 8px 14px;
    }
  }

  .answer {
    display: flex;
    gap: 16px;

    &:hover {
      .answer__btns {
        opacity: 1;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      flex: 0 0 32px;
      border-radius: 9999px;
      overflow: hidden;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__message-text {
      padding-top: 3px;
      white-space: normal;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: $primary;
    }

    &__btns {
      display: flex;
      opacity: 0;
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      flex: 0 0 30px;
      border-radius: 8px;

      &:hover {
        background-color: $ternary;
      }

      & svg {
        width: 18px;
        height: 18px;
        fill: $primary;
      }
    }
  }
}
</style>

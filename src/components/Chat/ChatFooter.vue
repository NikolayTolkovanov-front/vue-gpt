<template>
  <div class="container input-container">
    <Form
      @submit="submit"
      novalidate
      class="form"
      v-slot="{ values }"
    >
      <div class="input">
        <div class="input-file">
          <input
            @input="chooseFile"
            multiple=""
            type="file"
            name="file"
            ref="input-file"
            tabindex="-1"
            accept="image/*"
          />
          <div class="input-file__btn">
            <Tippy
              to="parent"
              trigger="mouseenter"
              :arrow="true"
              :hide-on-click="true"
              placement="top"
              theme="text"
            >
              <div
                class="text-popup"
                ref="input-text-popup"
              >
                <span class="text-popup-content">Прикрепить файл</span>
              </div>
            </Tippy>
            <Tippy
              to="parent"
              trigger="click"
              :arrow="false"
              placement="top-start"
              :interactive="true"
              theme="list"
            >
              <template #content="{ hide }">
                <div
                  class="list-popup input-menu"
                  ref="input-menu"
                >
                  <ul class="popup-list">
                    <li
                      @click="hide"
                      class="popup-list__item"
                    >
                      <div
                        @click="openFileMenu"
                        class="popup-list__link"
                      >
                        <div class="popup-list__item-icon">
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
                              d="M18.0322 5.02393C17.7488 5.00078 17.3766 5 16.8 5H11.5002C11.3 6 11.0989 6.91141 10.8903 7.85409C10.7588 8.44955 10.6432 8.97304 10.3675 9.41399C10.1262 9.80009 9.80009 10.1262 9.41399 10.3675C8.97304 10.6432 8.44955 10.7588 7.85409 10.8903C7.81276 10.8994 7.77108 10.9086 7.72906 10.9179L5.21693 11.4762C5.1442 11.4924 5.07155 11.5001 5 11.5002V16.8C5 17.3766 5.00078 17.7488 5.02393 18.0322C5.04612 18.3038 5.0838 18.4045 5.109 18.454C5.20487 18.6422 5.35785 18.7951 5.54601 18.891C5.59546 18.9162 5.69617 18.9539 5.96784 18.9761C6.25118 18.9992 6.62345 19 7.2 19H10C10.5523 19 11 19.4477 11 20C11 20.5523 10.5523 21 10 21H7.16144C6.6343 21 6.17954 21 5.80497 20.9694C5.40963 20.9371 5.01641 20.8658 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3.13419 18.9836 3.06287 18.5904 3.03057 18.195C2.99997 17.8205 2.99998 17.3657 3 16.8385L3 11C3 8.92477 4.02755 6.93324 5.4804 5.4804C6.93324 4.02755 8.92477 3 11 3L16.8385 3C17.3657 2.99998 17.8205 2.99997 18.195 3.03057C18.5904 3.06287 18.9836 3.13419 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C20.8658 5.01641 20.9371 5.40963 20.9694 5.80497C21 6.17954 21 6.6343 21 7.16144V10C21 10.5523 20.5523 11 20 11C19.4477 11 19 10.5523 19 10V7.2C19 6.62345 18.9992 6.25118 18.9761 5.96784C18.9539 5.69617 18.9162 5.59546 18.891 5.54601C18.7951 5.35785 18.6422 5.20487 18.454 5.109C18.4045 5.0838 18.3038 5.04612 18.0322 5.02393ZM5.28014 9.41336L7.2952 8.96556C8.08861 8.78925 8.24308 8.74089 8.35381 8.67166C8.48251 8.59121 8.59121 8.48251 8.67166 8.35381C8.74089 8.24308 8.78925 8.08861 8.96556 7.2952L9.41336 5.28014C8.51014 5.59289 7.63524 6.15398 6.89461 6.89461C6.15398 7.63524 5.59289 8.51014 5.28014 9.41336ZM17 15C17 14.4477 17.4477 14 18 14C18.5523 14 19 14.4477 19 15V17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H19V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V19H15C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17H17V15Z"
                            ></path>
                          </svg>
                        </div>
                        <p class="popup-list__item-text">Загрузить с компьютера</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
            </Tippy>
            <div class="input-file__icon">
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
                  d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div class="prompt">
          <div
            class="prompt-file"
            :class="{ hidden: inputFileImg === null }"
          >
            <div class="prompt-file__img">
              <img
                :src="inputImgPath"
                alt=""
              />
            </div>
            <button
              @click.prevent="closeImg"
              class="prompt-file__close"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
                ></path>
              </svg>
            </button>
          </div>
          <div class="prompt-text">
            <Field
              type="text"
              name="prompt"
              style="display: none"
              v-model="prompt"
            />
            <span
              data-placeholder="Введите текст"
              contenteditable="true"
              @input="changePrompt"
              class="prompt__text"
              >{{ prompt }}</span
            >
          </div>
        </div>
        <button
          type="submit"
          class="submit-btn"
          :class="{ filled: prompt }"
          :disabled="!prompt"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
            ></path>
          </svg>
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { defineModel, useTemplateRef, ref, watch } from 'vue'
import { Form, Field } from 'vee-validate'
import { useChatsStore } from '@/stores/chats'
import { useRoute, useRouter } from 'vue-router'
import { Tippy } from 'vue-tippy'

const emit = defineEmits(['sendPrompt'])

const chatsStore = useChatsStore()

const prompt = defineModel('prompt')

const route = useRoute()
const router = useRouter()

const inputFile = useTemplateRef('input-file')
const inputFileImg = ref(null)
const inputImgPath = ref(null)

function changePrompt(event) {
  prompt.value = event.target.textContent
}

function openFileMenu() {
  console.log('open')

  inputFile.value.click()
}

function chooseFile(event) {
  const files = event.target.files
  console.log('files', files)

  if (files.length) {
    const imgFile = files[0]

    inputFileImg.value = imgFile
    inputImgPath.value = URL.createObjectURL(imgFile)
    console.log('inputImgPath.value', inputImgPath.value)
  } else if (inputFileImg.value) {
    closeImg()
  }
}

function closeImg() {
  inputFileImg.value = null
  inputImgPath.value = null
}

async function submit(chat) {
  prompt.value = ''

  if (route.path.startsWith('/chat') && chatsStore.chats.length) {
    console.log('make sendPrompt')

    if (inputFileImg.value) {
      await chatsStore
        .sendPromptWithFile(chat.prompt, inputFileImg.value, route.params['id'])
        .then((res) => console.log('res'))
        .finally(() => {
          closeImg()
        })
      return
    }

    await chatsStore
      .sendPrompt(chat.prompt, route.params['id'])
      .then((res) => emit('sendPrompt', res))
      .catch((error) => console.log(error))

    return
  }

  if (route.path.startsWith('/')) {
    console.log('make addChat')
    console.log('chat.prompt', chat.prompt)

    if (inputFileImg.value) {
      await chatsStore
        .addChatWithFile(chat.prompt, inputFileImg.value)
        .then((chatId) => router.push(`/chat/${chatId}`))
        .finally(() => {
          closeImg()
        })
      return
    }

    await chatsStore
      .addChat(chat.prompt)
      .then((chatId) => {
        router.push(`/chat/${chatId}`)
      })
      .catch((error) => console.log(error))
  }
}

watch(
  () => route.params['id'],
  () => {
    inputFileImg.value = null
    inputImgPath.value = null
  }
)
</script>

<style lang="scss" scoped>
.input-container {
  width: 100%;
  margin-bottom: 52px;
}

.form {
  width: 100%;
}

.input {
  display: flex;
  background-color: #2f2f2f;
  gap: 8px;
  border-radius: 26px;
  width: 100%;
  padding: 6px 6px 6px 16px;

  .input-file {
    display: flex;
    align-self: end;
    cursor: pointer;

    & input {
      display: none;
    }

    &__btn {
      border: none;
      outline: none;
      background-color: transparent;
    }

    &__icon {
      width: 32px;
      height: 36px;
      flex: 0 0 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 2px;

      & svg {
        width: 24px;
        height: 24px;
        object-fit: cover;
        fill: $primary;
      }
    }
  }

  .prompt {
    display: flex;
    flex-direction: column;
    width: 100%;

    .prompt-text {
      display: flex;
      width: 100%;
    }

    .prompt-file {
      display: flex;
      position: relative;
      padding-top: 10px;

      &.hidden {
        display: none;
        opacity: 0;
        visibility: hidden;
      }

      &__img {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        overflow: hidden;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &__close {
        position: absolute;
        top: 0;
        left: 40px;
        display: flex;
        justify-content: center;
        width: 22px;
        height: 22px;
        flex: 0 0 22px;
        align-items: center;
        background-color: $secondary;
        border-radius: 9999px;
        border: 1px solid $primary;

        & svg {
          width: 16px;
          height: 16px;
          fill: $primary;
        }
      }
    }

    &__text {
      max-height: 200px;
      margin-top: 8px;
      margin-bottom: 8px;
      width: 100%;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      color: $primary;
      scrollbar-color: $ternary transparent;
      word-break: break-all;
      word-wrap: break-word;
      overflow: auto;

      &:empty::before {
        position: relative;
        z-index: 1;
        pointer-events: none;
        content: attr(data-placeholder);
        color: #b4b4b4;
      }
    }
  }

  .submit-btn {
    border-radius: 9999px;
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    margin: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
    background-color: #676767;
    transition: 0.1s;

    & svg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      fill: #2f2f2f;
    }

    &.filled {
      background-color: $primary;
    }
  }
}

@media (max-width: $md) {
}
</style>

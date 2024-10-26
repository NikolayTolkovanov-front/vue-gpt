<template>
  <main class="main-container">
    <section class="content-wrapper">
      <div class="title-wrapper">
        <h1 class="title">{{ route.meta.title }}</h1>
      </div>
      <p class="invalid-email-error-message">{{ authStore.error }}</p>
      <Form
        @submit="submit"
        novalidate
        class="login-container"
      >
        <div class="input-wrapper">
          <Field
            v-model="emailModel"
            :rules="validateEmail"
            class="auth-input"
            type="email"
            name="email"
            required=""
            placeholder=""
          /><label
            class="auth-label filled"
            for="email"
            >Адрес электронной почты</label
          >
          <ErrorMessage
            name="email"
            v-slot="{ message }"
          >
            <div class="invalid-email-error-message">
              <img
                class="error-icon"
                src="https://auth.openai.com/assets/error-icon-BaFi8GTB.svg"
              />{{ message }}
            </div>
          </ErrorMessage>
        </div>
        <div class="input-wrapper">
          <Field
            v-model="passwordModel"
            :rules="validatePassword"
            class="auth-input"
            type="password"
            name="password"
            required=""
            placeholder=""
          /><label
            class="auth-label filled"
            for="password"
            >Пароль</label
          >
          <ErrorMessage
            name="password"
            v-slot="{ message }"
          >
            <div class="invalid-email-error-message">
              <img
                class="error-icon"
                src="https://auth.openai.com/assets/error-icon-BaFi8GTB.svg"
              />{{ message }}
            </div>
          </ErrorMessage>
        </div>
        <div v-if="route.path.startsWith('/register')" class="gals">
          <div v-for="gal of authStore.gals" :key="gal.id" class="checkbox-wrapper">
            <input
              :is-required="1"
              ref="gals"
              :id="'checkbox-' + gal.id"
              class="substituted"
              type="checkbox"
              aria-hidden="true"
            />
            <label :for="'checkbox-' + gal.id" v-html="authStore.formattedTitle(gal.title, gal.keyword, gal.url_addr)"></label>
          </div>
        </div>
        <button class="continue-btn">Продолжить</button>
        <p class="other-page">
          {{
            route.path === '/register' ? 'Уже есть учетная запись?' : 'У вас нет учетной записи?'
          }}
          <RouterLink
            :to="route.path === '/register' ? '/login' : '/register'"
            class="other-page-link"
            >{{ route.path === '/register' ? 'Войти' : 'Зарегистрироваться' }}</RouterLink
          >
        </p>
      </Form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { onMounted, useTemplateRef } from 'vue';

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const emailModel = defineModel('emailModel')
const passwordModel = defineModel('passwordModel')
const gals = useTemplateRef('gals')

function validateEmail(value: string) {
  if (!value) {
    return 'Это поле обязательно'
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!regex.test(value)) {
    return 'Поле Email невалидно'
  }

  return true
}

function validatePassword(value: string) {
  if (!value) {
    return 'Это поле обязательно'
  }

  if (value.length < 3) {
    return 'Минимум 6 символов'
  }

  return true
}

async function submit(user) {

  
  if (route.path.startsWith('/register')) {
    for (const gal of gals.value) {
      console.log('gal', gal.getAttribute('is-required'), gal.checked);
    }

    await authStore
      .register(user)
      .then(() => {
        router.push('/login')
      })
      .catch((error) => console.log('error' + error))
  } else {
    await authStore
      .login(user)
      .then(() => {
        router.push('/')
      })
      .catch((error) => console.log('error' + error))
  }
}

onMounted(async () => {
  console.log();
  if (route.path.startsWith('/register')) {
    await authStore.getGals()
  }
})
</script>

<style scoped>
a {
  font-weight: 400;
  text-decoration: inherit;
  color: #10a37f;
}

.main-container {
  flex: 1 0 auto;
  min-height: 0;
  display: grid;
  box-sizing: border-box;
  grid-template-rows: [left-start center-start right-start] 1fr [left-end center-end right-end];
  grid-template-columns: [left-start center-start] 1fr [left-end right-start] 1fr [center-end right-end];
  align-items: center;
  justify-content: center;
  justify-items: center;
  grid-column-gap: 160px;
  column-gap: 160px;
  padding: 80px;
  width: 100%;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  white-space: normal;
  border-radius: 5px;
  position: relative;
  grid-area: center;
  box-shadow: none;
  vertical-align: baseline;
  box-sizing: content-box;
}
.title-wrapper {
  padding: 40px 40px 24px;
  box-sizing: content-box;
}
.title {
  font-size: 32px;
  margin: 24px 0 0;
  color: #2d333a;
  width: 320px;
  text-align: center;
}
.login-container {
  background-color: #fff;
  padding: 0 40px 40px;
  border-radius: 3px;
  box-shadow: none;
  width: 320px;
  box-sizing: content-box;
  flex-shrink: 0;
}
.input-wrapper {
  position: relative;
  margin-bottom: 25px;
  width: 320px;
  box-sizing: content-box;
}
.auth-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  border: 1px solid #c2c8d0;
  border-radius: 6px;
  box-sizing: border-box;
  color: #2d333a;
  font-family: inherit;
  font-size: 16px;
  height: 52px;
  line-height: 1.1;
  outline: none;
  padding-block: 1px;
  padding-inline: 2px;
  padding: 0 16px;
  transition:
    box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  width: 100%;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0;

  &:focus,
  &:valid {
    border: 1px solid #10a37f;
    outline: none;
  }

  &:focus + .auth-label {
    font-size: 14px;
    top: 0;
    left: 10px;
    color: #10a37f;
    background-color: #fff;
  }
}
.auth-label {
  position: absolute;
  top: 26px;
  left: 16px;
  background-color: #fff;
  color: #6f7780;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  max-width: 90%;
  overflow: hidden;
  pointer-events: none;
  padding: 1px 6px;
  text-overflow: ellipsis;
  transform: translateY(-50%);
  transform-origin: 0;
  transition:
    transform 0.15s ease-in-out,
    top 0.15s ease-in-out,
    padding 0.15s ease-in-out;
  white-space: nowrap;
  z-index: 1;

  &.filled {
    font-size: 14px;
    top: 0;
    left: 10px;
  }
}
.invalid-email-error-message {
  color: #d00e17;
  display: flex;
  margin: 4px 0 12px;
  font-size: 12px;
  align-items: center;
}
.error-icon {
  display: inline-block;
  height: 16px;
  width: 16px;
  margin-right: 8px;
  flex-shrink: 0;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 16px;
}
.gals {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .checkbox-wrapper [type='checkbox'].substituted {
    margin: 0;
    width: 0;
    height: 0;
    display: inline;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .checkbox-wrapper [type='checkbox'].substituted + label:before {
    content: '';
    display: inline-block;
    vertical-align: top;
    height: 1.15em;
    width: 1.15em;
    margin-right: 0.6em;
    color: rgba(0, 0, 0, 0.275);
    border: solid 0.06em;
    box-shadow:
      0 0 0.04em,
      0 0.06em 0.16em -0.03em inset,
      0 0 0 0.07em transparent inset;
    border-radius: 0.2em;
    background:
      url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="white" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>')
        no-repeat center,
      white;
    background-size: 0;
    will-change: color, border, background, background-size, box-shadow;
    transform: translate3d(0, 0, 0);
    transition:
      color 0.1s,
      border 0.1s,
      background 0.15s,
      box-shadow 0.1s;
  }
  .checkbox-wrapper [type='checkbox'].substituted:enabled:active + label:before,
  .checkbox-wrapper [type='checkbox'].substituted:enabled + label:active:before {
    box-shadow:
      0 0 0.04em,
      0 0.06em 0.16em -0.03em transparent inset,
      0 0 0 0.07em rgba(0, 0, 0, 0.1) inset;
    background-color: #f0f0f0;
  }
  .checkbox-wrapper [type='checkbox'].substituted:checked + label:before {
    background-color: #3b99fc;
    background-size: 0.75em;
    color: rgba(0, 0, 0, 0.075);
  }
  .checkbox-wrapper [type='checkbox'].substituted:checked:enabled:active + label:before,
  .checkbox-wrapper [type='checkbox'].substituted:checked:enabled + label:active:before {
    background-color: #0a7ffb;
    color: rgba(0, 0, 0, 0.275);
  }
  .checkbox-wrapper [type='checkbox'].substituted:focus + label:before {
    box-shadow:
      0 0 0.04em,
      0 0.06em 0.16em -0.03em transparent inset,
      0 0 0 0.07em rgba(0, 0, 0, 0.1) inset,
      0 0 0 3.3px rgba(65, 159, 255, 0.55),
      0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .checkbox-wrapper [type='checkbox'].substituted:focus:active + label:before,
  .checkbox-wrapper [type='checkbox'].substituted:focus + label:active:before {
    box-shadow:
      0 0 0.04em,
      0 0.06em 0.16em -0.03em transparent inset,
      0 0 0 0.07em rgba(0, 0, 0, 0.1) inset,
      0 0 0 3.3px rgba(65, 159, 255, 0.55),
      0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .checkbox-wrapper [type='checkbox'].substituted:disabled + label:before {
    opacity: 0.5;
  }

  .checkbox-wrapper [type='checkbox'].substituted.dark + label:before {
    color: rgba(255, 255, 255, 0.275);
    background-color: #222;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="rgba(34, 34, 34, 0.999)" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>');
  }
  .checkbox-wrapper [type='checkbox'].substituted.dark:enabled:active + label:before,
  .checkbox-wrapper [type='checkbox'].substituted.dark:enabled + label:active:before {
    background-color: #444;
    box-shadow:
      0 0 0.04em,
      0 0.06em 0.16em -0.03em transparent inset,
      0 0 0 0.07em rgba(255, 255, 255, 0.1) inset;
  }
  .checkbox-wrapper [type='checkbox'].substituted.dark:checked + label:before {
    background-color: #a97035;
    color: rgba(255, 255, 255, 0.075);
  }
  .checkbox-wrapper [type='checkbox'].substituted.dark:checked:enabled:active + label:before,
  .checkbox-wrapper [type='checkbox'].substituted.dark:checked:enabled + label:active:before {
    background-color: #c68035;
    color: rgba(0, 0, 0, 0.275);
  }
  .checkbox-wrapper [type='checkbox'].substituted + label {
    -webkit-user-select: none;
    user-select: none;
  }
}
.continue-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 52px;
  width: 320px;
  background-color: #10a37f;
  color: #fff;
  margin: 24px 0 0;
  border-radius: 6px;
  padding: 4px 16px;
  font: inherit;
  border-width: 0;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 0 150px #0000001a;
  }
}
.other-page {
  text-align: center;
  margin-top: 16px;
  margin-bottom: 0;
  font-size: 14px;
  width: 320px;
}
.other-page-link {
  padding: 4px;
}
.divider-wrapper {
  display: flex;
  flex-direction: row;
  text-transform: uppercase;
  border: none;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  padding: 24px 0 0;
  align-items: center;
  justify-content: center;
  width: 320px;
  vertical-align: baseline;

  &::before,
  &::after {
    content: '';
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: 0.5em;
    margin: 0;
  }
}
.divider {
  text-align: center;
  flex: 0.2 0 auto;
  margin: 0;
  height: 12px;
}
.social-section {
  margin-top: 24px;
}
.social-btn {
  position: relative;
  width: 320px;
  border: 1px solid #c2c8d0;
  border-radius: 6px;
  font-size: 16px;
  align-items: center;
  background-color: #fff;
  height: 52px;
  transition:
    box-shadow 0.15 ease-in-out,
    background-color 0.15s ease-in-out;
  cursor: pointer;
  color: #2d333a;
  margin-bottom: 8px;
  display: flex;
  outline: 0;
  padding: 0 8px 0 52px;
}
.social-logo-wrapper {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translate(-50%) translateY(-50%);
}
.social-logo {
  width: 20px;
  height: 20px;
  display: inline-block;
}
.social-text {
  text-align: left;
  position: relative;
}
</style>

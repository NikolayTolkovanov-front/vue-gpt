<template>
  <div
    @click="mainStore.toggleAside"
    class="overflow"
    :class="{ hidden: mainStore.asideHidden }"
  ></div>
  <nav
    class="aside"
    :class="{ hidden: mainStore.asideHidden }"
  >
    <div class="aside__body">
      <div class="aside-header">
        <Tippy
          :arrow="true"
          placement="right"
          theme="text"
        >
          <button
            @click="mainStore.toggleAside"
            class="toggle-nav"
            ref="toggle-nav-btn"
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
                d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z"
              ></path>
            </svg>
          </button>

          <template #content>
            <span class="text-popup-content">Закрыть боковую панель</span>
          </template>
        </Tippy>
        <Tippy
          :arrow="true"
          placement="right"
          theme="text"
        >
          <RouterLink
            to="/"
            class="new-chat"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
              ></path>
            </svg>
          </RouterLink>
          <template #content>
            <span class="text-popup-content">Новый чат</span>
          </template>
        </Tippy>
      </div>
      <div class="aside-content">
        <Tippy
          trigger="click"
          :arrow="false"
          placement="bottom-end"
          :interactive="true"
          :max-width="210"
          theme="list"
        >
          <button
            :disabled="!chatsStore.models.length"
            class="bots-list-btn"
          >
            Все GPTs
          </button>
          <template #content="{ hide }">
            <nav class="popup-menu">
              <ul class="popup-list">
                <li
                  @click="hide"
                  v-for="model of chatsStore.models"
                  :key="model.id"
                  class="popup-list__item"
                  :class="{ active: chatsStore.currentModel === model.title }"
                >
                  <button
                    @click="changeModel(model.id)"
                    class="popup-list__link"
                  >
                    <div class="popup-list__item-icon bots-list__icon--left">
                      <img
                        :src="model.photo_url"
                        alt=""
                      />
                    </div>
                    <p class="popup-list__item-text">{{ model.title }}</p>
                  </button>
                </li>
              </ul>
            </nav>
          </template>
        </Tippy>

        <ul class="chats-list">
          <li
            class="chats-item"
            v-for="category of chatsStore.sortedChatsByPeriods"
            :key="category.id"
          >
            <div class="date">
              <div class="date__body">
                <h3 class="date-text">{{ category.dateStr }}</h3>
              </div>
            </div>
            <ol class="chats-sublist">
              <li
                class="chat-subitem"
                :class="{ active: route.params['id'] && route.params['id'] == chat.id }"
                v-for="chat of category.chats"
                :key="chat.id"
              >
                <input
                  @input="changeInputChat($event, chat.id)"
                  @keyup.enter="renameChat(chat.id)"
                  @blur="renameChat(chat.id)"
                  v-if="chat.editable"
                  ref="changeChatNameInput"
                  class="change-chat-name"
                  type="text"
                />
                <RouterLink
                  v-else
                  class="chat-link"
                  :to="{ name: 'chat', params: { id: `${chat.id}` } }"
                >
                  <p class="chat-name">
                    {{ chat.name }}
                  </p>
                </RouterLink>
                <button
                  class="chat-subitem__btn-actions"
                  ref="action-btn"
                  v-if="!chat.editable"
                >
                  <Tippy
                    to="parent"
                    :arrow="true"
                    placement="right"
                    theme="text"
                  >
                    <div
                      class="text-popup"
                      ref="chats-list-text-popup"
                    >
                      <span class="text-popup-content">Опции</span>
                    </div>
                  </Tippy>
                  <Tippy
                    to="parent"
                    trigger="click"
                    :arrow="false"
                    placement="bottom-end"
                    :interactive="true"
                    theme="list"
                  >
                    <div
                      class="popup-menu"
                      ref="chats-list-menu-popup"
                    >
                      <ul class="popup-list">
                        <li class="popup-list__item">
                          <button
                            @click="toggleChangeChatName(chat.id)"
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
                                  d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                                ></path>
                              </svg>
                            </div>
                            <p class="popup-list__item-text">Переименовать</p>
                          </button>
                        </li>
                        <li
                          class="popup-list__item"
                          id="delete-chat-link"
                        >
                          <button
                            @click="deleteChat(chat.id)"
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
                                  d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
                                ></path>
                              </svg>
                            </div>
                            <p class="popup-list__item-text">Удалить</p>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </Tippy>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                    ></path>
                  </svg>
                </button>
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <div class="aside-footer">
        <p class="aside-footer__counter">
          Осталось запросов:
          <span class="aside-footer__counter-number">{{ chatsStore.promptLimit }}</span>
        </p>
        <a
          href="settings.html"
          class="aside-footer__link"
        >
          <div class="aside-footer__link-icon">
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
                d="M11.5677 3.5C11.2129 3.5 10.8847 3.68789 10.7051 3.99377L9.89391 5.37524C9.3595 6.28538 8.38603 6.84786 7.3304 6.85645L5.73417 6.86945C5.3794 6.87233 5.0527 7.06288 4.87559 7.3702L4.43693 8.13135C4.2603 8.43784 4.25877 8.81481 4.43291 9.12273L5.22512 10.5235C5.74326 11.4397 5.74326 12.5603 5.22512 13.4765L4.43291 14.8773C4.25877 15.1852 4.2603 15.5622 4.43693 15.8687L4.87559 16.6298C5.0527 16.9371 5.3794 17.1277 5.73417 17.1306L7.33042 17.1436C8.38605 17.1522 9.35952 17.7146 9.89393 18.6248L10.7051 20.0062C10.8847 20.3121 11.2129 20.5 11.5677 20.5H12.4378C12.7926 20.5 13.1208 20.3121 13.3004 20.0062L14.1116 18.6248C14.646 17.7146 15.6195 17.1522 16.6751 17.1436L18.2714 17.1306C18.6262 17.1277 18.9529 16.9371 19.13 16.6298L19.5687 15.8687C19.7453 15.5622 19.7468 15.1852 19.5727 14.8773L18.7805 13.4765C18.2623 12.5603 18.2623 11.4397 18.7805 10.5235L19.5727 9.12273C19.7468 8.81481 19.7453 8.43784 19.5687 8.13135L19.13 7.3702C18.9529 7.06288 18.6262 6.87233 18.2714 6.86945L16.6751 6.85645C15.6195 6.84786 14.646 6.28538 14.1116 5.37524L13.3004 3.99377C13.1208 3.68788 12.7926 3.5 12.4378 3.5H11.5677ZM8.97978 2.98131C9.5186 2.06365 10.5033 1.5 11.5677 1.5H12.4378C13.5022 1.5 14.4869 2.06365 15.0257 2.98131L15.8369 4.36278C16.015 4.66616 16.3395 4.85365 16.6914 4.85652L18.2877 4.86951C19.352 4.87818 20.3321 5.4498 20.8635 6.37177L21.3021 7.13292C21.832 8.05239 21.8366 9.18331 21.3142 10.1071L20.522 11.5078C20.3493 11.8132 20.3493 12.1868 20.522 12.4922L21.3142 13.893C21.8366 14.8167 21.832 15.9476 21.3021 16.8671L20.8635 17.6282C20.3321 18.5502 19.352 19.1218 18.2877 19.1305L16.6914 19.1435C16.3395 19.1464 16.015 19.3339 15.8369 19.6372L15.0257 21.0187C14.4869 21.9363 13.5022 22.5 12.4378 22.5H11.5677C10.5033 22.5 9.5186 21.9363 8.97978 21.0187L8.16863 19.6372C7.99049 19.3339 7.666 19.1464 7.31413 19.1435L5.71789 19.1305C4.65357 19.1218 3.67347 18.5502 3.14213 17.6282L2.70347 16.8671C2.17358 15.9476 2.16899 14.8167 2.6914 13.893L3.48361 12.4922C3.65632 12.1868 3.65632 11.8132 3.48361 11.5078L2.6914 10.1071C2.16899 9.18331 2.17358 8.05239 2.70347 7.13292L3.14213 6.37177C3.67347 5.4498 4.65357 4.87818 5.71789 4.86951L7.31411 4.85652C7.66599 4.85366 7.99048 4.66616 8.16862 4.36278L8.97978 2.98131Z"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.0028 10.5C11.1741 10.5 10.5024 11.1716 10.5024 12C10.5024 12.8284 11.1741 13.5 12.0028 13.5C12.8315 13.5 13.5032 12.8284 13.5032 12C13.5032 11.1716 12.8315 10.5 12.0028 10.5ZM8.50178 12C8.50178 10.067 10.0692 8.5 12.0028 8.5C13.9364 8.5 15.5038 10.067 15.5038 12C15.5038 13.933 13.9364 15.5 12.0028 15.5C10.0692 15.5 8.50178 13.933 8.50178 12Z"
              ></path>
            </svg>
          </div>
          <p class="aside-footer__link-name">Настройки</p>
        </a>
        <button
          @click="logout"
          class="aside-footer__link"
        >
          <div class="aside-footer__link-icon">
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
                d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H10C10.5523 20 11 20.4477 11 21C11 21.5523 10.5523 22 10 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H6ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z"
              ></path>
            </svg>
          </div>
          <p class="aside-footer__link-name">Выйти</p>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useChatsStore } from '@/stores/chats'
import { useMainStore } from '@/stores/main'
import { onMounted, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tippy } from 'vue-tippy'

const mainStore = useMainStore()
const authStore = useAuthStore()
const chatsStore = useChatsStore()

const router = useRouter()
const route = useRoute()

const changeChatNameInput = useTemplateRef<Array<HTMLElement>>('changeChatNameInput')

async function logout() {
  await authStore.logout()
  router.push('/logout')
}

async function toggleChangeChatName(chatId: number) {
  await chatsStore.toggleChangeChatName(chatId)

  if (changeChatNameInput.value) {
    changeChatNameInput.value[0].focus()
  }
}

function changeInputChat(event: Event, chatId: number) {
  const target = event.target as HTMLInputElement
  chatsStore.changeInputChat(target.value, chatId)
}

async function renameChat(chatId: number) {
  await chatsStore.renameChat(chatId)
}

async function deleteChat(chatId: number) {
  await chatsStore.deleteChat(chatId).then(() => router.push('/'))
}

function changeModel(modelId: number) {
  chatsStore.changeModel(modelId)
}

onMounted(async () => {
  await chatsStore.getModels()
  await chatsStore.getPromptsLimit()
})
</script>

<style lang="scss" scoped>
.aside {
  background-color: $surface;
  width: 260px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: width 0.2s;
  color: $primary;
  overflow-x: hidden;
  scrollbar-color: #424242 transparent;
  position: relative;
  opacity: 1;
  visibility: visible;

  &.hidden {
    width: 0;
    left: -100%;
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: 0 12px;
    width: 100%;
    height: 100%;
    position: relative;
  }

  &-header {
    background-color: $surface;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 60px;

    .toggle-nav,
    .new-chat {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 8px;
      height: 40px;
      border-radius: 8px;

      &:hover {
        background-color: $secondary;
      }

      & svg {
        width: 24px;
        height: 24px;
        flex: 0 0 24px;
        object-fit: cover;
        fill: $primary;
      }
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 8px;

    .bots-list-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      column-gap: 6px;
      align-items: center;
      border: 1px solid hsla(0, 0%, 100%, 0.15);
      border-radius: 9999px;
      padding: 8px 14px;
      background-color: transparent;
      color: $primary;

      &:hover {
        background-color: #2f2f2f;
      }

      &:disabled {
        background-color: #4f4f4f;
      }
    }

    .chats-list {
      display: flex;
      flex-direction: column;
    }
    .chats-item {
      margin-top: 20px;
      position: relative;
      display: flex;
      flex-direction: column;

      .date {
        position: sticky;
        top: 0;
        z-index: 10;
        background: $surface;

        &__body {
          display: flex;
          height: 36px;
          align-items: center;
        }

        .date-text {
          padding: 12px 8px 8px 8px;
          word-break: break-all;
          overflow: hidden;
          font-size: 12px;
          font-weight: 600;
          line-height: 16px;
          color: $primary;
        }
      }

      .chats-sublist {
        display: flex;
        flex-direction: column;
      }

      .chat-subitem {
        padding: 8px;
        display: flex;
        align-items: center;
        gap: 5px;
        border-radius: 10px;

        &:hover {
          background-color: $secondary;

          .chat-subitem__btn-actions svg {
            fill: $primary;
          }
        }

        &.active {
          background-color: $secondary;

          .chat-subitem__btn-actions svg {
            fill: $primary;
          }
        }

        &__btn-actions {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;

          & svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            fill: none;
          }
        }
      }

      .chat-link {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 0 8px;
        overflow: hidden;
      }

      .chat-name {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: $primary;
        white-space: nowrap;
        overflow: hidden;
      }

      .change-chat-name {
        background-color: transparent;
        border: 1px solid blue;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: $primary;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  &-footer {
    padding: 8px 0;

    &__link {
      display: flex;
      width: 100%;
      gap: 8px;
      padding: 8px;
      align-items: center;
      overflow: hidden;
    }

    &__link-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
      border-radius: 999px;
      overflow: hidden;

      & svg,
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 999px;
        fill: $primary;
      }
    }

    &__link-name {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: $primary;
      flex-grow: 1;
      text-align: left;
      white-space: nowrap;
    }

    &__counter {
      padding: 8px;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      color: $primary;
      flex-grow: 1;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
    }

    &__counter-number {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: $primary;
    }
  }
}

.overflow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: none;
  background-color: rgba(0, 0, 0, 0.5);

  &.hidden {
    display: none;
  }
}

@media (max-width: $md) {
  .overflow {
    display: block;
  }

  .aside {
    position: fixed;
    z-index: 9999;
  }
}
</style>

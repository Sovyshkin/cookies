<script>
import AppHeader from "./components/AppHeader.vue";

export default {
  name: "App",
  components: { AppHeader },
  data() {
    return {
      chatID: "", // Храним chatID
    };
  },
  methods: {
    getChatID() {
      // Проверяем, доступен ли Telegram Web App API
      if (window.Telegram && window.Telegram.WebApp) {
        // Получаем initData
        const initData = window.Telegram.WebApp.initData;

        // Если initData доступен, извлекаем chat_id
        if (initData) {
          // Декодируем строку initData
          const decodedInitData = decodeURIComponent(initData);

          // Создаем объект URLSearchParams для парсинга
          const params = new URLSearchParams(decodedInitData);

          // Получаем параметр user
          const userString = params.get("user");

          // Если user существует, парсим его
          if (userString) {
            const user = JSON.parse(userString);
            this.chatID = user.id; // chatID — это id пользователя
            localStorage.setItem("chatID", this.chatID);
          }
        }
      } else {
        console.log("Telegram Web App API is not available");
      }
    },
  },
  mounted() {
    this.getChatID(); // Вызываем метод при монтировании компонента
  },
};
</script>

<template>
  <AppHeader />
  <div class="wrap">
    <router-view></router-view>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Manrope:wght@200..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");
#app {
  font-family: "Manrope", sans-serif;
  width: 100%;
  background-color: #fff;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 400;
  font-style: normal;
  font-family: "Manrope", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 85%;
  margin: 0 auto;
  padding-top: 10vh;
  background-color: #fff;
}

body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.card {
  transition: all 500ms ease;
  cursor: pointer;
}

.wrap {
  max-width: 1440px;
  margin: 0 auto;
}

h1 {
  text-align: center;
}

.msg {
  padding: 10px 13px;
  font-size: 16px;
  line-height: 16px;
  color: #fff;
  border-radius: 15px;
  width: fit-content;
  margin: 0 auto;
}

.success {
  background-color: #3cca0d;
}

.error {
  background-color: #cf0032;
}

@media (max-width: 820px) {
  .wrap {
    width: 95%;
  }
}
</style>

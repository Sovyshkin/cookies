// src/i18n/index.js
import { createI18n } from "vue-i18n";

const messages = {
  RU: {
    cart: "Корзина",
    settings: "Настройки",
    shop: "Магазин",
    catalog: "Каталог",
    myOrders: "Мои заказы",
    myAddress: "Мои адреса",
    gramm: "г",
    sign: "₽",
    emptyCart: "К сожалению, вы ничего не добавили...",
    lang: "Язык",
  },
  UZ: {
    cart: "Savat",
    settings: "Sozlamalar",
    shop: "Do'kon",
    catalog: "Katalog",
    myOrders: "Mening buyurtmalarim",
    myAddress: "Mening manzillarim",
    gramm: "g",
    sign: "UZS",
    emptyCart: "Afsuski, siz hech narsa qo'shmadingiz...",
    lang: "Til",
  },
};

const i18n = createI18n({
  locale: "RU",
  messages,
});

export default i18n;

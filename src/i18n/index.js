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
    // sign: "₽",
    sign: 'UZS',
    emptyCart: "К сожалению, вы ничего не добавили...",
    lang: "Язык",
    city: "Город",
    enterCity: "Введите название города",
    enterStreet: "Введите название улицы",
    enterHouse: "Введите номер дома",
    street: "Улица",
    house: "Дом",
    addAddress: "Добавить адрес",
    zipCode: "Почтовый индекс",
    enterZipCode: "Введите почтовый индекс",
    totalPrice: "Общая стоимость",
    empty: "Пусто...",
    dona: "шт",
    inStock: "в наличии",
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
    city: "Shahar",
    enterCity: "Shahar nomini kiriting",
    enterStreet: "Ko'cha nomini kiriting",
    enterHouse: "Uy raqamini kiriting",
    street: "Ko'cha",
    house: "Uy",
    addAddress: "Manzil qo'shish",
    zipCode: "Pochta indeksi",
    enterZipCode: "Pochta indeksini kiriting",
    totalPrice: "Umumiy xarajat",
    empty: "Bo'sh...",
    dona: "dona",
    inStock: "mavjud",
  },
};

const i18n = createI18n({
  locale: "RU",
  messages,
});

export default i18n;

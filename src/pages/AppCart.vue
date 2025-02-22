<script>
import axios from "axios";
import AppCard from "../components/AppCard.vue";
import { GDialog } from "gitart-vue-dialog";
import AppLoader from "@/components/AppLoader.vue";
export default {
  name: "AppCart",
  components: { AppCard, GDialog, AppLoader },
  data() {
    return {
      cards: [],
      dialogState: false,
      name: "",
      description: "",
      price: "",
      img: "",
      idCard: "",
      isLoading: false,
      message: "",
      addresses: [],
      address_id: "",
      totalPrice: 0,
    };
  },
  methods: {
    openModal(card) {
      try {
        this.name = card.name;
        this.description = card.description;
        this.price = card.price;
        this.img = card.img;
        this.idCard = card.id;
        this.dialogState = true;
      } catch (err) {
        console.log(err);
      }
    },
    async load_info() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/get_cart`, {
          headers: {
            "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
            "X-CHAT-ID": localStorage.getItem("chatID"),
          },
        });
        console.log(response);
        this.cards = response.data.cart || [];
        this.totalPrice = response.data.total_price || 0;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    async load_addresses() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/get_addresses`, {
          headers: {
            "X-CHAT-ID": localStorage.getItem("chatID"),
            "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
          },
        });
        console.log(response);
        this.addresses = response.data.addresses || [];
        console.log(this.addresses);
        if (this.addresses.length > 0) {
          this.address_id = this.addresses[0].id;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
    async createOrder() {
      try {
        if (this.cards.length > 0) {
          this.isLoading = true;
          let response = await axios.post(
            `/create_order`,
            {},
            {
              headers: {
                "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
                "X-CHAT-ID": localStorage.getItem("chatID"),
                "X-ADDRESS-ID": this.address_id,
              },
            }
          );
          console.log(response);
          if (response.status == 200) {
            this.message = "Успешно";
          } else {
            this.message = response.data.detail;
          }
          setTimeout(() => {
            this.load_info();
            this.message = "";
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.load_info();
    this.load_addresses();
  },
};
</script>
<template>
  <h1>{{ $t("cart") }}</h1>
  <AppLoader v-if="isLoading" />
  <section class="cart" v-if="cards.length > 0 && !isLoading">
    <AppCard
      v-for="card in cards"
      :price="card.price"
      :name="card.name"
      :description="card.description"
      :img="card.img"
      :id="card.id"
      :key="card.id"
      :cart="true"
      :quantity="card.quantity"
      @click="openModal(card)"
      @updateInfo="load_info"
    />
    <GDialog v-model="dialogState" :max-width="1000" :border-radius="30">
      <div class="dialog">
        <div class="img">
          <img :src="img" alt="" />
        </div>
        <div class="title">{{ name }}</div>
        <div class="weight">{{ description }} г</div>
        <div class="price">
          <span>{{ price }} ₽</span>
          <img class="plus" src="../assets/plus.png" alt="" />
        </div>
      </div>
    </GDialog>
  </section>
  <div class="empty" v-else>
    <img class="empty-cart" src="../assets/empty-cart.png" alt="empty-cart" />
    <span>{{ $t("emptyCart") }}</span>
  </div>
  <div class="wrap-btns" v-if="cards.length > 0 && !isLoading">
    <div class="group">
      <label for="address" class="group-value">Выберите адрес доставки</label>
      <select
        class="group-item"
        name="address"
        id="address"
        v-model="address_id"
      >
        <option :value="item.id" v-for="item in addresses" :key="item.id">
          {{ $t("city") }}: {{ item.city }}, {{ $t("street") }}:
          {{ item.street }}, {{ $t("zipCode") }}: {{ item.zip_code }}
        </option>
      </select>
    </div>
    <div class="wrap-price">
      <h2>{{ $t("totalPrice") }}:</h2>
      <span>{{ totalPrice }} {{ $t("sign") }}</span>
    </div>
    <div
      class="msg"
      :class="{
        success: this.message == 'Успешно',
        error: this.message != 'Успешно',
      }"
      v-if="message"
    >
      {{ message }}
    </div>
    <button class="btn" @click="createOrder()" v-else>Оформить заказ</button>
  </div>
</template>
<style scoped>
.cart {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.dialog {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.title {
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.02px;
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  color: rgb(89, 89, 89);
}

.weight {
  color: rgb(166, 166, 166);
  font-size: 13px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0.02px;
}

.img {
  width: 70%;
  height: 30vh;
  border-radius: 18px;
  background-color: #f2f2f2;
}

.price {
  width: fit-content;
  background-color: #f2f2f2;
  padding: 7px 12px 7px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  letter-spacing: -0.1px;
  color: rgb(255, 51, 95);
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
}

.plus {
  width: 24px;
  height: 24px;
}

.empty {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: large;
  color: rgb(166, 166, 166);
  font-weight: 600;
  line-height: 20px;
  text-align: center;
}

.empty-cart {
  width: 50px;
  height: 50px;
}

.wrap-btns {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe3ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.btn {
  width: 100%;
  text-align: center;
  background-color: #f0feed;
  color: #259800;
  padding: 14.5px 24px;
  border-radius: 8px;
}

.wrap-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  font-size: 20px;
  line-height: 20px;
  color: #272727;
  font-weight: 600;
}

.wrap-price span {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  color: #272727;
}
@media (max-width: 820px) {
  .catalog {
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>

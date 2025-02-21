<script>
import axios from "axios";

export default {
  name: "AppCard",
  components: {},
  data() {
    return {};
  },
  props: {
    id: String,
    name: String,
    image_url: String,
    description: String,
    price: String,
    cart: Boolean,
    quantity: String,
  },
  methods: {
    async removeItem() {
      try {
        let response = await axios.delete(`/remove_from_cart`, {
          data: {
            product_id: this.id,
            quantity: 1,
          },
          headers: {
            "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
            "X-CHAT-ID": "1",
          },
        });
        console.log(response);
        if (response.status == 200) {
          this.$emit("updateInfo");
        }
      } catch (err) {
        console.log(err);
      }
    },

    async addAgain() {
      try {
        let response = await axios.post(
          `/add_to_cart`,
          {
            product_id: this.id,
            quantity: 1,
          },
          {
            headers: {
              "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
              "X-CHAT-ID": "1",
            },
          }
        );
        console.log(response);
        if (response.status == 200) {
          this.$emit("updateInfo");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="card">
    <div class="img">
      <img :src="`https://saler-bot.prostor-dev.ru/api${image_url}`" alt="" />
    </div>
    <div class="title">{{ name }}</div>
    <div class="weight">{{ description }}</div>
    <div class="price">
      <img
        @click.stop="removeItem"
        class="minus"
        src="../assets/minus.png"
        alt=""
        v-if="cart"
      />
      <span v-if="cart">{{ quantity }}</span>
      <span v-if="!cart">{{ price }} {{ $t("sign") }}</span>
      <img
        class="plus"
        src="../assets/plus.png"
        alt=""
        @click.stop="addAgain()"
      />
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3px;
  cursor: pointer;
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
  width: 200px;
  height: 200px;
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

.plus,
.minus {
  width: 24px;
  height: 24px;
}
</style>

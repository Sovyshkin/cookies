<script>
import axios from "axios";
export default {
  name: "MyOrders",
  components: {},
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async load_orders() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/get_orders`, {
          headers: {
            "X-CHAT-ID": localStorage.getItem("chatID"),
            "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
          },
        });
        console.log(response);
        this.orders = response.data.orders;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.load_orders();
  },
};
</script>
<template>
  <h1>{{ $t("myOrders") }}</h1>
  <section class="myOrders">
    <div class="card" v-for="item in orders" :key="item.id">
      <h2>Заказ №{{ item.order_id }}</h2>
      <div class="group">
        <span class="card-item">{{ $t("city") }}:</span>
        <span class="card-value">{{ item.city }}</span>
      </div>
      <div class="group">
        <span class="card-item">{{ $t("street") }}:</span>
        <span class="card-value">{{ item.street }}</span>
      </div>
      <div class="group">
        <span class="card-item">{{ $t("zipCode") }}:</span>
        <span class="card-value">{{ item.zip_code }}</span>
      </div>
      <div class="group">
        <span class="card-item">{{ $t("totalPrice") }}:</span>
        <span class="card-value">{{ item.total_price }} {{ $t("sign") }}</span>
      </div>
      <!-- <button class="btn delete">Удалить</button> -->
    </div>
  </section>
</template>
<style scoped>
.myOrders {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
}

.card {
  padding: 20px;
  border: 1px solid #eff1f6;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  align-items: center;
}

.group {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 7px;
}

.card-item {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: #5b6171;
  letter-spacing: 0em;
}

.card-value {
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  color: #262d40;
}

.btn {
  border: 1px solid #dc2626;
  padding: 14.5px 24px;
  border-radius: 8px;
  color: #dc2626;
  font-weight: 600;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0em;
}

@media (max-width: 540px) {
  .card {
    width: 100%;
  }
}
</style>

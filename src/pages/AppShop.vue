<script>
import AppCard from "../components/AppCard.vue";
import AppCategories from "../components/AppCategories.vue";
import { GDialog } from "gitart-vue-dialog";
import axios from "axios";
import AppLoader from "@/components/AppLoader.vue";
export default {
  name: "AppShop",
  components: { AppCard, AppCategories, GDialog, AppLoader },
  data() {
    return {
      products: [
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
        {
          name: "Из Польши: Печенье Dr Gerard Magic Duo, с шоколадным кремом и сливками",
          description: "35.6",
          price: "49",
          img: "",
        },
      ],
      dialogState: false,
      name: "",
      description: "",
      price: "",
      img: "",
      idCard: "",
      country: "RU",
      isLoading: false,
    };
  },
  methods: {
    openModal(card) {
      this.name = card.name;
      this.description = card.description;
      this.price = card.price;
      this.img = card.img;
      this.idCard = card.id;
      this.dialogState = true;
    },
    async getCountryByIP() {
      const url = "http://ip-api.com/json";
      const response = await fetch(url);
      const data = await response.json();
      let country = data.country;
      console.log(country);
      if (country == "Russia") {
        this.country = "RU";
      } else if (country == "Uzbekistan") {
        this.country = "UZ";
      }
      this.$t.locale = this.country;
    },
    async load_products(section_id) {
      try {
        this.isLoading = true;
        let response = await axios.get(`/get_products/${section_id}`, {
          headers: {
            "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
          },
        });
        console.log(response);
        this.products = response.data.products;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async addCart() {
      try {
        let response = await axios.post(
          `/add_to_cart`,
          {
            product_id: this.idCard,
            quantity: 1,
          },
          {
            headers: {
              "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getCountryByIP();
  },
};
</script>
<template>
  <AppCategories @updateProducts="load_products" />
  <AppLoader v-if="isLoading" />
  <section class="catalog" v-if="!isLoading">
    <AppCard
      v-for="card in products"
      :price="card.price"
      :name="card.name"
      :description="card.description"
      :img="card.img"
      :id="card.id"
      :key="card.id"
      @click="openModal(card)"
    />
    <GDialog v-model="dialogState" :max-width="1000" :border-radius="30">
      <div class="dialog">
        <div class="img">
          <img :src="img" alt="" />
        </div>
        <div class="title">{{ name }}</div>
        <div class="weight">{{ description }} г</div>
        <div class="price" @click="addCart">
          <span>{{ price }} ₽</span>
          <img class="plus" src="../assets/plus.png" alt="" />
        </div>
      </div>
    </GDialog>
  </section>
</template>
<style scoped>
.catalog {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
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
  cursor: pointer;
}

.plus {
  width: 24px;
  height: 24px;
}

@media (max-width: 820px) {
  .catalog {
    justify-content: space-evenly;
    align-items: center;
  }
}
</style>

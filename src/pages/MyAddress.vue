<script>
import axios from "axios";
export default {
  name: "MyAddress",
  components: {},
  data() {
    return {
      isLoading: false,
      message: "",
    };
  },
  methods: {
    async load_addresses() {
      try {
        this.isLoading = true;
        let response = await axios.get(`/get_addresses`, {
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
  },
  mounted() {
    this.load_addresses();
  },
};
</script>
<template>
  <h1>{{ $t("myAddress") }}</h1>
  <section class="myAddress"></section>
</template>
<style scoped></style>

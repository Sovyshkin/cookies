<script>
import axios from "axios";
import AppLoader from "@/components/AppLoader.vue";
export default {
  name: "CreateAddress",
  components: { AppLoader },
  data() {
    return {
      isLoading: false,
      message: "",
      street: "",
      house: "",
      city: "",
      zip_code: "",
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
    async addAddress() {
      try {
        this.isLoading = true;
        if (this.street && this.city && this.zip_code) {
          let response = await axios.post(
            `/add_address`,
            {
              street: this.street,
              city: this.city,
              zip_code: this.zip_code,
            },
            {
              headers: {
                "X-CHAT-ID": "1",
                "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
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
            this.message = "";
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        this.message = err.data.detail;
        setTimeout(() => {
          this.message = "";
        }, 2000);
      } finally {
        this.isLoading = false;
        this.$emit("updateInfo");
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <AppLoader v-if="isLoading" />
  <div class="wrap-group" v-else>
    <div class="group">
      <label for="city" class="group-value">{{ $t("city") }}</label>
      <input
        type="text"
        id="city"
        name="city"
        v-model="city"
        class="group-item"
        :placeholder="$t('enterCity')"
      />
    </div>
    <div class="group">
      <label for="street" class="group-value">{{ $t("street") }}</label>
      <input
        type="text"
        id="street"
        name="street"
        v-model="street"
        class="group-item"
        :placeholder="$t('enterStreet')"
      />
    </div>
    <!-- <div class="group">
      <label for="house" class="group-value">{{ $t("house") }}</label>
      <input
        type="text"
        id="house"
        name="house"
        v-model="house"
        class="group-item"
        :placeholder="$t('enterHouse')"
      />
    </div> -->
    <div class="group">
      <label for="zipCode" class="group-value">{{ $t("zipCode") }}</label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        v-model="zip_code"
        class="group-item"
        :placeholder="$t('enterZipCode')"
      />
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
    <button v-else class="btn" @click="addAddress()">
      {{ $t("addAddress") }}
    </button>
  </div>
</template>
<style scoped>
.wrap-group {
  display: flex;
  flex-wrap: wrap;
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
</style>

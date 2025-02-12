<script>
export default {
  name: "AppHeader",
  components: {},
  data() {
    return {
      items: [],
      menu: false,
    };
  },
  methods: {
    goRoute(name) {
      this.$router.push({ name });
    },
  },
  mounted() {},
};
</script>
<template>
  <header class="wrapper">
    <div class="menu">
      <div class="menu-closed" @click="menu = !menu">
        <img src="../assets/menu.png" alt="" />
      </div>
      <transition name="fade">
        <div class="menu-opened" v-if="menu">
          <div class="item" @click="goRoute('shop')">
            <img src="../assets/shop.png" alt="" />
            <span>{{ $t("shop") }}</span>
          </div>
          <div class="item" @click="goRoute('cart')">
            <img src="../assets/cart.png" alt="" />
            <span>{{ $t("cart") }}</span>
          </div>
          <div class="item" @click="goRoute('myOrders')">
            <img src="../assets/delivery.png" alt="" />
            <span>{{ $t("myOrders") }}</span>
          </div>
          <div class="item" @click="goRoute('myAddress')">
            <img src="../assets/address.png" alt="" />
            <span>{{ $t("myAddress") }}</span>
          </div>
          <div class="item" @click="goRoute('settings')">
            <img src="../assets/settings.png" alt="" />
            <span>{{ $t("settings") }}</span>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>
<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 10px;
}

.menu-closed {
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  z-index: 2;
}

.menu-closed img {
  height: 24px;
  width: 24px;
  cursor: pointer;
}

.menu-opened {
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  z-index: 2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.1px;
  cursor: pointer;
  padding: 3px;
}

.item img {
  width: 20px;
  height: 20px;
}
</style>

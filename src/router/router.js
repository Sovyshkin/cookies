import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/AppShop.vue"),
      name: "shop",
    },
    {
      path: "/cart",
      component: () => import("../pages/AppCart.vue"),
      name: "cart",
    },
    {
      path: "/settings",
      component: () => import("../pages/AppSettings.vue"),
      name: "settings",
    },
    {
      path: "/my-orders",
      component: () => import("../pages/MyOrders.vue"),
      name: "myOrders",
    },
    {
      path: "/my-addresses",
      component: () => import("../pages/MyAddress.vue"),
      name: "myAddress",
    },
  ],
});

export default router;

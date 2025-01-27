<script>
export default {
  name: "AppSettings",
  components: {},
  data() {
    return {
      lang: "RU",
      countries: ["RU", "UZ"],
      active: false,
    };
  },
  methods: {
    async changeLang(lang) {
      try {
        this.lang = lang;
        localStorage.setItem("lang", this.lang);
        this.$i18n.locale = this.lang;
      } catch (err) {
        console.log(err);
      }
    },
    loadLang() {
      try {
        this.lang = localStorage.getItem("lang");
        if (this.lang) {
          this.$i18n.locale = this.lang;
        } else {
          this.lang = "RU";
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.loadLang();
  },
};
</script>
<template>
  <h1>{{ $t("settings") }}</h1>
  <section class="settings">
    <div class="group">
      <span class="group-item">{{ $t("lang") }}</span
      >-
      <div class="lan" @click="active = !active">
        <img class="flag" :src="'../assets/' + lang + '.png'" alt="" />
        <span>{{ lang }}</span>
        <img class="arrow" src="../assets/arrow-down.png" alt="" />
        <div class="all_flags" v-if="active">
          <div
            class="group-country"
            @click="changeLang(item)"
            v-for="item in countries"
            :key="item"
          >
            <img class="flag" :src="'../assets/' + item + '.png'" alt="" />
            <span class="group-value">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.settings {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.group-item {
  font-size: 22px;
  font-weight: 600;
  line-height: 22px;
}

.lan {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  cursor: pointer;
  padding: 5px;
  background-color: #f2f2f2;
  border-radius: 10px;
}

.all_flags {
  position: absolute;
  padding: 3px 7px;
  transform: translateY(40px);
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 #00000037;
  z-index: 3;
  min-width: 57px;
}

.group-country {
  display: flex;
  align-items: center;
  gap: 6px;
}

.flag {
  width: 24px;
  height: 24px;
}

.arrow {
  width: 24px;
  height: 24px;
}
</style>

<script>
import axios from "axios";

export default {
  name: "AppCategories",
  components: {},
  data() {
    return {
      sections: [
        {
          id: 1,
          title: "Категория 1",
        },
        {
          id: 2,
          title: "Категория 2",
        },
        {
          id: 3,
          title: "Категория 3",
        },
        {
          id: 4,
          title: "Категория 4",
        },
      ],
      section_id: "",
    };
  },
  methods: {
    async load_sections() {
      try {
        let response = await axios.get(`/get_sections`, {
          headers: {
            "X-API-KEY": "d87f37bdd129d8150610ab0268e161a5",
          },
        });
        console.log(response);
        this.sections = response.data.sections;
        for (let i = 0; i < this.sections.length; i++) {
          this.sections[i].active = false;
        }
        if (this.sections[0]) {
          this.sections[0].active = true;
          this.section_id = this.sections[0].id;
          this.$emit("updateProducts", this.section_id);
        }
      } catch (err) {
        console.log(err);
      }
    },

    clickSection(id) {
      try {
        if (id) {
          for (let i = 0; i < this.sections.length; i++) {
            this.sections[i].active = false;
            if (this.sections[i].id == id) {
              this.sections[i].active = true;
              this.section_id = id;
              this.$emit("updateProducts", this.section_id);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    await this.load_sections();
  },
};
</script>
<template>
  <section class="categories">
    <button
      class="category"
      v-for="section in sections"
      :class="{ active: section.active }"
      :key="section.id"
      @click="clickSection(section.id)"
    >
      {{ section.name }}
    </button>
  </section>
</template>
<style scoped>
.categories {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.category {
  padding: 5px 10px;
  background-color: #f2f2f2;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: all 500ms ease;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: -0.1px;
}

.category:hover,
.category:active,
.category:focus,
.active {
  transform: translateY(-3px);
  color: rgb(255, 51, 95);
}
</style>

<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :floor="floor" :key="floor.id" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Brand from "./Brand";
import Like from "./Like";
import Floor from "./Floor";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  methods: {
    getFloorList() {
      this.$store.dispatch("getFloorList");
    },
  },
  mounted() {
    this.getFloorList();
  },
};
</script>

<style lang="less" scoped></style>

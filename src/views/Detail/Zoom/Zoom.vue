<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event" @mousemove="eventHandler" ref="eventDiv"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["imageList"],
  data() {
    return {
      defaultIndex: 0,
    };
  },
  computed: {
    defaultImg() {
      return this.imageList[this.defaultIndex] || {};
    },
  },
  methods: {
    eventHandler(e) {
      const mask = this.$refs.mask;
      const bigImg = this.$refs.bigImg;
      const eventDiv = this.$refs.eventDiv;
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      let left = mouseX - mask.offsetWidth / 2;
      let top = mouseY - mask.offsetHeight / 2;
      if (left < 0) {
        left = 0;
      } else if (left > eventDiv.offsetWidth - mask.offsetWidth) {
        left = eventDiv.offsetWidth - mask.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > eventDiv.offsetHeight - mask.offsetHeight) {
        top = eventDiv.offsetHeight - mask.offsetHeight;
      }
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      bigImg.style.left = -2 * left + "px";
      bigImg.style.top = -2 * top + "px";
    },
  },
  mounted() {
    this.$bus.$on("changeIndex", (index) => {
      this.defaultIndex = index;
    });
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>

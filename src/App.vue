<template>
  <div id="app" @click="show=false" :style="{background: backgroundImage}">
    <div class="actions-wrapper">
      <button class="prev" disabled></button>
      <button class="next"></button>
      <button @click.stop="show=!show" class="info" :title="imageInfo.copyright"></button>
    </div>
    <div :class="['detail-wrapper', show?'show':'']">
      <div class="detail" v-html="imageDetail"></div>
    </div>
  </div>
</template>

<script>
import { getImage, getImageDetail } from './utils/api';

export default {
  name: 'App',
  data() {
    return {
      idx: 0,
      imageInfo: {},
      imageDetail: null,
      show: false,
    };
  },
  computed: {
    backgroundImage() {
      return this.imageInfo.url ? `url(http://cn.bing.com${this.imageInfo.url})` : null;
    },
  },
  created() {
    this.getWallpapaer();
    this.getWallpapaerInfo();
  },
  methods: {
    async getWallpapaer(idx = 0) {
      const res = await getImage(idx);
      this.imageInfo = res.images[0];
    },
    async getWallpapaerInfo() {
      const res = await getImageDetail();
      this.imageDetail = res;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body, #app {
  height: 100%;
}
#app {
  display: flex;
  position: relative;
  overflow: hidden;
}
.actions-wrapper {
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  padding: 10px 30px;
  margin-bottom: 20px;
}
.actions-wrapper button {
  width: 40px;
  height: 40px;
  margin: 0 15px;
  border: none;
  outline: none;
  background:transparent url(assets/icons.png) no-repeat;
  cursor: pointer;
  z-index: 100;
}
.actions-wrapper button:disabled {
  background-position-x: 0 !important;
  opacity: .7;
  cursor: default;
}
button.info {
  background-position: 0 -42px;
}
button.prev {
  background-position: 0 -84px;
}
button.next {
  background-position: 0 -126px
}
.actions-wrapper button:enabled:hover {
  background-position-x: -252px;
  width: 42px;
  height: 42px;
  margin: -1px 14px;
}
.detail-wrapper {
  background: rgba(0, 0, 0, .8);
  width: 364px;
  height: 100vh;
  padding: 30px;
  position: absolute;
  right: -424px;
  top: 0;
  transition: right .4s;
}
.detail-wrapper.show {
  right: 0;
}
.detail-wrapper .detail {
  max-height: calc(100vh - 120px);
  overflow: scroll;
  width: 385px;
  overflow-x: hidden;
}
</style>

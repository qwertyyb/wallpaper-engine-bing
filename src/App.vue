<template>
  <div id="app" @click="showDetail=false" :style="imageInfo.url|toBGForm">
    <div class="actions-wrapper">
      <button class="qrcode">
        <p class="line"></p>
        <qrcode-vue :value="'http://cn.bing.com'+imageInfo.url" className="qrcode-img" :size="130"></qrcode-vue>
      </button>
      <button @click.stop="idx+=1" class="prev" :disabled="idx>=7"></button>
      <button @click.stop="idx-=1" class="next" :disabled="idx<0"></button>
      <button @click.stop="showDetail=!showDetail" class="info"
        :title="imageInfo.copyright"></button>
    </div>
    <div :class="['detail-wrapper', showDetail?'show':'']">
      <div class="detail" v-html="imageDetail"></div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { getImage, getImageDetail } from './utils/api';

export default {
  name: 'App',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      idx: 0,
      imageInfo: {},
      imageDetail: null,
      showDetail: false,
    };
  },
  filters: {
    toBGForm(imageUrl) {
      return imageUrl ? { backgroundImage: `url(http://cn.bing.com${imageUrl})` } : null;
    },
  },
  watch: {
    idx(newValue) {
      this.getWallpapaer(newValue);
      this.getWallpapaerInfo(newValue);
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
    async getWallpapaerInfo(idx) {
      const res = await getImageDetail(idx);
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
  transition: background .4s;
  background-color: rgba(0, 0, 0, .8);
}
.actions-wrapper {
  width: 100%;
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;
  padding: 10px 30px;
  margin-bottom: 50px;
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
.actions-wrapper button:enabled:not(.qrcode):hover {
  background-position-x: -252px;
  width: 42px;
  height: 42px;
  margin: -1px 14px;
}
.detail-wrapper {
  background: rgba(0, 0, 0, .8);
  width: 364px;
  height: 100vh;
  padding: 0 30px;
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
  overflow-y: scroll;
  width: 385px;
  overflow-x: hidden;
}
button.qrcode {
  position: relative;
  background: transparent url(assets/qrcode-icon.png) no-repeat;
  background-position: 0 0;
}
.actions-wrapper button.qrcode:hover{
  background-position-x: -40px;
}
button.qrcode .line {
  position: absolute;
  left: calc(50% - 2px);
  bottom: 40px;
  width: 0;
  border: 1px solid #fff;
  height: 70px;
}
button.qrcode .qrcode-img {
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -50px;
  bottom: 110px;
  width: 150px;
  height: 150px;
  background: rgba(0, 0, 0, .8);
}
button.qrcode:hover .qrcode-img {
  display: flex;
}
button.qrcode>.line {
  display: none;
}
button.qrcode:hover>.line{
  display: initial;
}
</style>

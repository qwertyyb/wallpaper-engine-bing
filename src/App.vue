<template>
  <div id="app" :style="{background: backgroundImage}">
    <div class="copyright">
      <p>copyright：{{imageInfo.copyright}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      idx: 0,
      imageInfo: {},
    };
  },
  computed: {
    backgroundImage() {
      return this.imageInfo.url ? `url(http://cn.bing.com${this.imageInfo.url})` : null;
    },
  },
  created() {
    this.getWallpapaer();
  },
  methods: {
    async getWallpapaer(idx = 0) {
      const res = await axios.get(`https://bird.ioliu.cn/v2?url=https://cn.bing.com/HPImageArchive.aspx?format=js&idx=${idx}&n=1`);
      this.imageInfo = res.data.images[0];
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
  height: 100%
}
.copyright p{
  float: right;
  color: #fff;
  width: 400px
}
</style>

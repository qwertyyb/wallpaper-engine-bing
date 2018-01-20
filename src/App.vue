<template>
  <div id="app" :style="{background: backgroundImage}">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      imageInfo: {},
    };
  },
  computed: {
    backgroundImage() {
      return `url(http://cn.bing.com${this.imageInfo.url})`;
    },
  },
  async created() {
    const res = await axios.get('https://bird.ioliu.cn/v2?url=https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
    this.imageInfo = res.data.images[0];
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
</style>

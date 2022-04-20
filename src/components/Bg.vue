<template>
  <div class="bg" :height="800" width="1200px">
    <div class="img_box">
      <video
        src="http://domhttp.kksmg.com/2022/04/09/h264_720p_600k_34178-smgnews-20220409065000-9000-219594-600k_mp4.mp4"
        muted
        autoplay
        loop
        :width="fullWidth + 'px'"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Bg",
  data() {
    return {
      // 获取设备宽度、高度
      fullWidth: document.documentElement.clientWidth,
    };
  },

  created() {
    // 添加监听，监听设备宽高
    addEventListener("resize", () => {
      let widtht = document.documentElement.clientWidth;
      this.fullWidth = widtht > 625 ? widtht : 625;
    });
  },
};
</script>

<style scoped>
.bg {
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.bg .img_box {
  width: 100%;
  height: 100%;
}
.bg .img_box img {
  position: fixed; /* 固定图片位置 */
}
</style>

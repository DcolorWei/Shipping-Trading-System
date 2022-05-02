<template>
  <canvas id="container" :width="1200" :height="600"></canvas>
  <button id="a">aaa</button>
  <div class="affix">
    <n-icon size="40" :component="Add" />
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { NIcon } from "naive-ui";
import { Add } from "@vicons/ionicons5";
export default defineComponent({
  mounted() {
    AMapLoader.load({
      key: "78f9ea31100755605aa3419672bc1979", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      Loca: {
        version: "2.0.0",
      },
    }).then((AMap) => {
      var map = new AMap.Map("container", {
        terrain: true,
        viewMode: "2D",
        zoom: 1,
        center: [121.603077, 38.912069],
        pitch: 45,
        showLabel: true,
        showBuildingBlock: false,
        dragEnable: false,
        mapStyle: "amap://styles/dark",
        zIndex: [1, 20],
      });

      var loca = ((window as any).loca = new (window as any).Loca.Container({
        map,
      }));
      console.log(loca);
      var path = [
        [121.603077, 38.912069],
        [121.601567, 38.926337],
        [121.616993, 38.926481],
        [121.636986, 38.933106],
        [121.639516, 38.933442],
        [121.647229, 38.931042],
        [121.648525, 38.931042],
        [121.649635, 38.930514],
        [121.653276, 38.932434],
        [121.657349, 38.93109],
        [121.653584, 38.933538],
        [121.656176, 38.938625],
        [123.936247, 34.091177],
        [127.852083, 29.879837],
        [143.944981, 30.277214],
        [149.944981, 31.277214],
        [152.944981, 30.277214],
        [153.944981, 30.277214],
        [159.944981, 30.277214],
        [165.944981, 32.277214],
        [179.944981, 30.077214],
      ];

      // 轨迹

      var marker = new AMap.Marker({
        //   //跟随图标参数
        content: '<div class="amap-ani"></div>',
        anchor: "bottom-center",
        map: map,
      });
      var polyline = new AMap.Polyline({
        //   //绘制路径的参数

        //     //路径默认绘制
        path: [[121.603077, 38.912069]],
        isOutline: false,
        strokeColor: "#00E98F",
        strokeOpacity: 1,
        strokeWeight: 3,
        strokeStyle: "solid",
        lineJoin: "round",
        lineCap: "round",
        zIndex: 500,
        map: map,
      });
      var finished = false;
      function run() {
        if (!finished) {
          var center = map.getCenter().toArray();
          var lastPath = polyline.getPath();
          lastPath.push(center);
          if (lastPath.length === 1) {
            lastPath.push(center);
          }
          polyline.setPath(lastPath);
          marker.setPosition(center);
        }
        requestAnimationFrame(run);
      }
      run();

      loca.animate.start();
      document.querySelector("#a")!.addEventListener("click", () => {
        finished = false;
        polyline.setPath([[121.603077, 38.912069]]);
        loca.viewControl.addAnimates(
          [
            {
              // 缩放等级动画
              zoom: {
                value: 3, // 动画终点的地图缩放等级
                control: [
                  [0.1, 10],
                  [0.4, 3],
                  [0.8, 3],
                  [1.0, 3],
                ], // 控制器，x是0～1的起始区间，y是zoom值
                timing: [0.22, 0, 0.4, 1],
                duration: 10000,
              },
            },
          ],
          () => {
            // 动画执行结束
          }
        );
        loca.viewControl.addTrackAnimate(
          {
            path: path, // 镜头轨迹，二维数组，支持海拔
            duration: 10000, // 时长
            timing: [
              [0, 0.3],
              [1, 0.7],
            ], // 速率控制器
            rotationSpeed: 0, // 每秒旋转多少度
          },
          function () {
            finished = true;
            console.log("完成");
            loca.remove(polyline);
          }
        );
      });

      // 绑定事件

      //删除版权信息，注意版权问题
      let logo = document.getElementsByClassName("amap-logo")[0];
      logo.parentNode!.removeChild(logo);
      let copyright = document.getElementsByClassName("amap-copyright")[0];
      copyright.parentNode!.removeChild(copyright);
    });
    return {
      Add,
    };
  },
  components: {
    NIcon,
  },
});
</script>

<style scoped>
.affix {
  width: 40px;
  height: 40px;
  background: #ffd664;
  border: 3px solid #474747;
  border-radius: 50%;
  position: fixed;
  right: 6%;
  bottom: 20%;
}
</style>

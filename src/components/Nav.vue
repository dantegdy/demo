<template>
  <div class="Nav">
    <div class="Nav_logo"><router-link to="/">Dante代码之家</router-link></div>
    <div class="Nav_right">
      <div class="Nav_sousuo">
        <input type="text" class="Nav_sousuo__text" />
        <i class="iconfont icon-sousuo"></i>
      </div>
      <!-- 遍历导航路由 -->
      <div class="Nav_box">
        <router-link
          class="Nav_route"
          :to="item.to"
          v-for="item in NavData"
          :key="item.to"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      NavData: [
        { name: "基础", to: "jichu" },
        { name: "中级", to: "zhongji" }
        // { name: "进阶", to: "jinjie" },
        // { name: "高频", to: "gaoping" },
        // { name: "指南", to: "help" },
      ]
    };
  }
};
</script>

<style scoped lang="less">
.Nav {
  //   height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 11.2px 24px;
  border: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height:60px;
}
.Nav_logo a{
  color: #000;
}
.Nav_right {
  display: flex;
  align-items: center;
  .Nav_route {
    color: rgba(0, 0, 0, 0.8);
    margin-left: 24px;
    &:hover {
      border-bottom: green 2px solid;
    }
  }
  .Nav_sousuo {
    border: 1px solid rgba(0, 0, 0, 0.8);
    border-radius: 17px;
    height: 34px;
    width: 220px;
    position: relative;
    .icon-sousuo {
      position: absolute;
      top: 17px;
      left: 6px;
      transform: translate(0, -50%);
    }
    .Nav_sousuo__text {
      border: 0;
      outline: none;
      width: 100%;
      height: 100%;
      border-radius: 17px;
      text-indent: 30px;
      background: rgba(0, 0, 0, 0);
      //   opacity: 0;
    }
  }
  .Nav_sousuo:focus-within {
    border: 1px solid green;
  }
}
</style>

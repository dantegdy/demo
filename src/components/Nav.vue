<template>
  <div class="Nav">
    <div class="Nav_logo">
      <router-link to="">Dante代码之家</router-link>
      <div class="Nav_user" v-if="this.$store.state.username">
        <div>
          {{ this.$store.state.username }}
        </div>
        <div class="Nav_user_zx" @click="zxUser"> 注销</div>
      </div>
    </div>
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
        { name: "了解", to: "liaojie" },
        { name: "我的", to: "wode" },
        { name: "新增", to: "xinzeng" }
        // { name: "高频", to: "gaoping" },
        // { name: "指南", to: "help" },
      ]
    };
  },
  methods:{
    zxUser(){
      console.log("zhuxiao")
      window.localStorage.username="";
      window.localStorage.user_id="";
      this.$router.go(0)
    },
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
  // border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  z-index: 999;
}
.Nav_logo a {
  color: #000;
}

.Nav_user{
  display: flex;
  font-size: 12px;
  .Nav_user_zx{
    margin-left:20px;
  }
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

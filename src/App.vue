<template>
  <div id="app">
    <Nav></Nav>
    <div class="box">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  components: {
    Nav
  }
};
</script>

<style lang="less">
@import url("http://at.alicdn.com/t/font_2032197_y9fzrpnpbbk.css");
.box {
  margin-top: 60px;
}
a{
  text-decoration: none;
}
</style>

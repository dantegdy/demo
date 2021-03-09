<template>
  <div id="app">
    <Nav class="navclass"></Nav>
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
  },
  created(){
    this.userInit()
  },
  methods:{
    userInit(){
      // console.log(this.$store.state.username)
      if(!this.$store.state.username){
        if(window.localStorage.username){
          this.$store.commit({
            type:'loginSucc',
            username:window.localStorage.getItem('username')
          })
          this.$store.state.user_id=window.localStorage.getItem('user_id')
        }
      }
    }
  }
};
</script>

<style lang="less">
@import url("http://at.alicdn.com/t/font_2032197_y9fzrpnpbbk.css");
.box {
  position: relative;
  top: 60px;
  z-index: 0;
  min-width:960px;
  margin: auto;
}
.navclass {
  min-width:960px;
  margin: auto;
}
a{
  text-decoration: none;
}
</style>

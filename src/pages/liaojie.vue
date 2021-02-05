<template>
  <div class="hello">
    <vue-markdown class="markdown-body">{{msg}}</vue-markdown>
  <!-- <div>{{msg}}</div> -->
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
// const marked = require("marked")
// import mineMarkdown from "../assets/markdown/qianduan.md"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg:""
    }
  },
  created(){
    const mineMarkdown=require("../assets/markdown/qianduan.md")
    // console.log(mineMarkdown)
    this.msg=mineMarkdown
    // this.msg=marked(mineMarkdown)
  },
  components:{
    'vue-markdown': VueMarkdown
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >

</style>

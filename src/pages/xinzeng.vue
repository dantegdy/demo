<template>
  <div>
    <div class="title">
      <div class="tltle_txt">标题：</div>
      <input class="title_input" type="text" v-model="title" />
      <div class="tltle_txt">类型：</div>
      <input class="title_input" type="text" v-model="type" />
      <button @click="saveMd">保存</button>
    </div>

    <mavon-editor
      class="markdownTxt"
      v-model="value"
      @save="saveMd"
      @change="
        value => {
          mdChange(value);
        }
      "
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      type: "",
      title: "",
      userid: "17898444116"
    };
  },
  created() {},
  methods: {
    saveMd() {
      if (this.title && this.value && this.type) {
        console.log("save");
        let msg = escape(this.value);
        var url = `http://49.234.229.70:8090/setmd?userid=${this.$store.state.user_id}&type=${this.type}&title=${this.title}&msg=${msg}`;
        // var url = `http://127.0.0.1:8090/setmd?userid=${this.$store.state.user_id}&type=${this.type}&title=${this.title}&msg=${msg}`;

        fetch(url, {
          method: "POST" // or 'PUT'
        })
          .then(res => res.json())
          .catch(error => console.error("Error:", error))
          .then(response => {
            console.log("Success:", response.mdId);
            this.$router.push(`/app/liaojie?id=${response.mdId}`);
          });
      } else {
        alert("标题、类型或内容不得为空");
      }
    },
    mdChange(text) {
      // console.log(text);
      console.log(escape(text))
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  width: 500px;
  height: 100px;
  margin: auto;
  padding-top: 10px;
  .tltle_txt {
    display: inline;
    font-size: 20px;
  }
  .title_input {
    height: 20px;
    width: 410px;
  }
}
.markdownTxt {
}
</style>

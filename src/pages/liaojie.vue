<template>
  <div class="liaojie">
    <div class="lj_left">
      <div
        v-for="item in markdownJson"
        :key="item.id"
        @click="clickTitle(item)"
        class="left_item"
      >
        <div class="left_item_title">{{ item.title }}</div>
      </div>
    </div>
    <div class="lj_right">
      <h1 class="md_title">{{ title }}</h1>
      <!--
            defaultOpen="preview"    edit： 默认展示编辑区域 ， preview： 默认展示预览区域  , 其他 = edit
            :subfield="false" true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
            :toolbarsFlag="false"   工具栏是否显示
            :editable="true"   是否允许编辑
            :boxShadow="false" 开启边框阴影
            :shortCut="false"  是否启用快捷键
            :navigation="true" 导航菜单是否开启
       -->
      <mavon-editor
        class="deitor_style"
        v-model="value"
        defaultOpen="preview"
        :subfield="false"
        :toolbarsFlag="false"
        :editable="false"
        :boxShadow="false"
        :shortCut="false"
      />
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { resolve } from "q";
export default {
  name: "liaojie",
  data() {
    return {
      title: "",
      markdownJson: [],
      showType: 1, //  1:日常显示状态 2:编辑状态
      escapeString: ""
    };
  },
  computed: {
    value: {
      get: function() {
        return unescape(this.escapeString);
      },
      set: function() {
        return unescape(this.escapeString);
      }
    }
  },

  created() {
    this.dataInit();
  },

  methods: {
    async dataInit() {
      await this.getdata();
      console.log(this.markdownJson);
      if (!this.$route.query.id) {
        this.$router.push(`/liaojie?id=${this.markdownJson[0].id}`);
      }
      for (let item of this.markdownJson) {
        //如果id存在则渲染
        if (this.$route.query.id == item.id) {
          this.title = item.title;
          this.escapeString = item.msg;
          return;
        }
      }
      //不存在就显示第一条数据
      this.$router.push(`/liaojie?id=${this.markdownJson[0].id}`);
      this.$router.go(0);
    },
    getdata() {
      // let url = `http://localhost:8090/getmd`;
      let url = `http://49.234.229.70:8090/getmd`;
      return fetch(url)
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("Success:", response);
          this.markdownJson = response.list;
          resolve(response);
        });
    },
    clickTitle(item) {
      if (this.$route.query.id != item.id) {
        this.$router.push(`/liaojie?id=${item.id}`);
        this.title = item.title;
        this.escapeString = item.msg;
      }
    }
  },
  components: {
    "vue-markdown": VueMarkdown
  }
};
</script>

<style scoped lang="less">
.deitor_style {
  width: 960px;
}

.liaojie {
  display: flex;
  .lj_left {
    width: 200px;
    border-right: 1px solid #000;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    .left_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #000;
      padding: 10px 0;
    }
    .left_item_title {
      width: 150px;
    }
    .left_item_btn {
      width: 48px;
      height: 24px;
    }
  }
  .lj_right {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
    margin-left: 201px;
    .lj_markdown {
      width: 920px;
    }
    .md_title {
    }
  }
}
</style>

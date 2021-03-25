<template>
  <div class="liaojie">
    <template v-if="markdownJson.length">
      <div class="lj_left">
        <div
          v-for="item in markdownJson"
          :key="item.id"
          @click="clickTitle(item)"
          class="left_item"
        >
          <div class="left_item_title">{{ item.title }}</div>
          <button class="left_item_btn" @click="deleMd(item.id)">删除</button>
        </div>
      </div>
      <div class="lj_right">
        <h1 class="md_title" v-show="showType == 1">{{ title }}</h1>
        <input type="text" v-model="title" v-show="showType == 2" />
        <button @click="clickButton" v-show="showType == 1">编辑</button>
        <button @click="clickButton" v-show="showType == 2">完成</button>
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
          v-show="showType == 1"
          v-model="value"
          @save="saveMd"
          @change="
            value => {
              mdChange(value);
            }
          "
          defaultOpen="preview"
          :subfield="false"
          :toolbarsFlag="false"
          :editable="false"
          :boxShadow="false"
          :shortCut="false"
        />
        <mavon-editor
          class="deitor_style"
          v-show="showType == 2"
          v-model="value"
          @save="saveMd"
          @change="
            value => {
              mdChange(value);
            }
          "
          defaultOpen="edit"
          :subfield="false"
          :toolbarsFlag="false"
          :boxShadow="false"
          :shortCut="false"
        />
      </div>
    </template>
    <template v-else>
      <h1 class="link_xz"><router-link to="xinzeng">新建文档去</router-link></h1>
    </template>
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
      // toolbars: {
      //   navigation: true,
      //   subfield: true,
      //   preview: true
      // },
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
    deleMd(id) {
      console.log(id);
      var url = `http://49.234.229.70:8090/delmd?id=${id}`;
      // var url = `http://127.0.0.1:8090/delmd?id=${id}`;

      fetch(url, {
        method: "POST" // or 'PUT'
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("Success:", response);
          this.dataInit();
        });
      if (id == this.$route.query.id) {
        this.$router.go(-1);
        console.log(-1);
      } else {
        this.$router.go(0);
      }
    },
    async dataInit() {
      await this.getdata();
      console.log(this.markdownJson);
      if (!this.markdownJson.length) {
        return;
      } else {
        if (!this.$route.query.id) {
          this.$router.push(`/app/wode?id=${this.markdownJson[0].id}`);
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
        this.$router.push(`/app/wode?id=${this.markdownJson[0].id}`);
        this.$router.go(0);
      }
    },
    getdata() {
      console.log(this.$store.state.username);
      let url = `http://49.234.229.70:8090/getmd?user_id=${this.$store.state.user_id}`;
      // let url = `http://localhost:8090/getmd?user_id=${this.$store.state.user_id}`;
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
        this.$router.push(`/app/wode?id=${item.id}`);
        this.title = item.title;
        this.escapeString = item.msg;
      }
    },
    clickButton() {
      if (this.showType == 1) {
        //展示状态
        console.log("切换为编辑状态");
        this.showType = 2;
      } else {
        //编辑状态
        console.log("保存");
        this.saveMd();
        this.showType = 1;
      }
    },
    saveMd() {
      console.log("save");
      let msg = escape(this.escapeString);
      var url = `http://49.234.229.70:8090/savemd?id=${this.$route.query.id}&title=${this.title}&msg=${msg}`;
      // var url = `http://127.0.0.1:8090/savemd?id=${this.$route.query.id}&title=${this.title}&msg=${msg}`;

      fetch(url, {
        method: "POST" // or 'PUT'
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("Success:", response);
          this.dataInit();
        });
    },
    mdChange(value) {
      this.escapeString = value;
      // console.log(escape(value));
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

.link_xz {
  width: 100%;
  text-align: center;
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

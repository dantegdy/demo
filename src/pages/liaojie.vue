<template>
  <div class="liaojie">
    <div class="lj_left">
      <div
        v-for="item in markdownJson"
        :key="item.title"
        @click="clickTitle(item)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="lj_right">
      <h1 class="md_title">{{ title }}</h1>
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
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
import { resolve } from 'q';
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
      escapeString:
        "%23%20mongoDB%20%u6570%u636E%u5E93%0A%0A%23%23%201.%u8FDB%u5165%20mongodb%0A%0A%60%60%60%0Amongo%0A%60%60%60%0A%0A%23%23%202.%u6570%u636E%u5E93%u64CD%u4F5C%0A%0A%23%23%23%23%202.1%20%u663E%u793A%u6240%u6709%u6570%u636E%u5E93%0A%0A%60%60%60%0Ashow%20dbs%0A%60%60%60%0A%0A%23%23%23%23%202.2%20%u4F7F%u7528%u6570%u636E%u5E93%0A%0A%60%60%60%0Ause%20itying%0A%60%60%60%0A%0A%23%23%23%23%202.3%20%u521B%u5EFA%u6570%u636E%u96C6%u5408%uFF08%u8868%uFF09%u5E76%u65B0%u589E%u4E00%u6761%u6570%u636E%0A%0A%60%60%60%0Adb.user.insert%28%7B%22username%22%3A%22zhangsan%22%2C%22age%22%3A25%7D%29%0A%60%60%60%0A%0A%23%23%23%23%202.4%20%u5220%u9664%u6570%u636E%u5E93%0A%0A%60%60%60%0Ause%20itying%0Adb.dropDatabase%28%29%0A%60%60%60%0A%0A%23%23%203.%u6570%u636E%u96C6%u5408%28%u8868%29%u64CD%u4F5C%0A%0A%23%23%23%23%203.1%20%u67E5%u770B%u6570%u636E%u5E93%u6709%u54EA%u4E9B%u6570%u636E%u96C6%u5408%uFF08%u8868%uFF09%0A%0A%60%60%60%0Ashow%20collections%0A%60%60%60%0A%0A%23%23%23%23%203.2.%u5220%u9664%u96C6%u5408%0A%0A%60%60%60%0Adb.user.drop%28%29%0A%60%60%60%0A%0A%23%23%204.%u67E5%u8BE2%u6570%u636E%0A%0A%23%23%23%23%204.1%20%u67E5%u8BE2%u8868%u5185%u6240%u6709%u6570%u636E%0A%0A%60%60%60%0Adb.user.find%28%29%0A%60%60%60%0A%0A%23%23%23%23%204.2%20%u67E5%u8BE2%20age%3D25%20%u7684%u8BB0%u5F55%0A%0A%60%60%60%0Adb.user.find%28%7B%22age%22%3A25%7D%29%3B%0A%60%60%60%0A%0A%23%23%23%23%204.3%20%u67E5%u8BE2%20age%26gt%3B%3D25%20%u7684%u8BB0%u5F55%0A%0A%60%60%60%0Adb.user.find%28%7B%22age%22%3A%7B%26%2336%3Bgt%3A25%7D%7D%29%3B%0A%60%60%60%0A%0A%23%23%23%23%204.4%20%u67E5%u8BE2%20age%26lt%3B%3D25%20%u7684%u8BB0%u5F55%0A%0A%60%60%60%0Adb.user.find%28%7B%22age%22%3A%7B%26%2336%3Blt%3A25%7D%7D%29%3B%0A%60%60%60%0A%0A%23%23%23%23%204.5%20%u67E5%u8BE2%20age%26gt%3B%3D23%20%u5E76%u4E14%26lt%3B%3D26%20%u7684%u8BB0%u5F55%0A%0A%60%60%60%0Adb.user.find%28%7B%22age%22%3A%7B%26%2336%3Bgte%3A23%2C%26%2336%3Blte%3A26%7D%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.6%20%u67E5%u8BE2%20name%20%u4E2D%u5305%u542B%20mongo%20%u7684%u6570%u636E%20%28%u6A21%u7CCA%u67E5%u8BE2%29%0A%0A%60%60%60%0Adb.user.find%28%7B%22name%22%3A/mongo/%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.7%20%u67E5%u8BE2%20name%20%u4E2D%u4EE5%20mogon%20%u5F00%u5934%u7684%0A%0A%60%60%60%0Adb.user.find%28%7B%22name%22%3A/%5Emongo/%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.8%20%u67E5%u8BE2%20name%20%u4E2D%u4EE5%20mogon%20%u7ED3%u5C3E%u7684%0A%0A%60%60%60%0Adb.user.find%28%7B%22name%22%3A/mongo%26%2336%3B/%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.9%20%u67E5%u8BE2%u6307%u5B9A%u5217%u6570%u636E%0A%0A%60%60%60%0Adb.user.find%28%7B%7D%2C%7Bage%3A1%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.10%20%u5347%u5E8F%0A%0A%60%60%60%0Adb.user.find%28%29.sort%28%7Bage%3A1%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.11%20%u964D%u5E8F%0A%0A%60%60%60%0Adb.user.find%28%29.sort%28%7Bage%3A-1%7D%29%0A%60%60%60%0A%0A%23%23%23%23%204.12%20%u67E5%u8BE2%u524D%205%20%u6761%u6570%u636E%0A%0A%60%60%60%0Adb.user.find%28%29.limit%285%29%0A%60%60%60%0A%0A%23%23%23%23%204.13%20%u67E5%u8BE2%2010%20%u6761%u4EE5%u540E%u7684%u6570%u636E%0A%0A%60%60%60%0Adb.user.find%28%29.skip%2810%29%0A%60%60%60%0A%0A%23%23%23%23%204.13%20%u67E5%u8BE2%u7B2C%203%u30014%20%u6761%u6570%u636E%u7684%u6570%u636E%0A%0A%60%60%60%0Adb.user.find%28%29.skip%282%29.limit%282%29%0A%60%60%60%0A%0A%23%23%23%23%204.14%20%u67E5%u8BE2%u8868%u91CC%u6709%u591A%u5C11%u6761%u6570%u636E%0A%0A%60%60%60%0Adb.user.find%28%29.count%28%29%0A%60%60%60%0A%0A%23%23%23%23%204.15%20%u5206%u9875%u67E5%u8BE2%0A%0A%u6BCF%u4E00%u9875%2010%20%u6761%u6570%u636E%20%u67E5%u8BE2%u7B2C%203%20%u9875%u7684%u6570%u636E%0Askip%28%28Page-1%29%5C*PageSize%29%0Alimit%28PageSize%29%0A%0A%60%60%60%0Adb.user.find%28%29.skip%2820%29.limit%2810%29%0A%60%60%60%0A%0A%23%23%23%23%204.16%20%u6216%u8005%20or%20%u67E5%u8BE2%0A%0A%60%60%60%0Adb.user.find%28%7B%26%2336%3Bor%3A%5B%7Bage%3A22%7D%2C%7Bage%3A25%7D%5D%7D%29%3B%0A%60%60%60%0A%0A%23%23%23%23%204.17%20%u67E5%u8BE2%u7B2C%u4E00%u6761%u6570%u636E%0A%0A%60%60%60%0Adb.user.findOne%28%29%0A%60%60%60%0A%0A%23%23%205.%u4FEE%u6539%u6570%u636E%0A%0A%23%23%23%23%20%u67E5%u627E%u540D%u5B57%u53EB%22%u5C0F%u660E%22%u7684%uFF0C%u628A%u5E74%u9F84%u66F4%u6539%u4E3A%2216%22%u5C81%0A%0A%60%60%60%0Adb.user.update%28%7B%22name%22%3A%22%u5C0F%u660E%22%7D%2C%7B%26%2336%3Bset%3A%7B%22age%22%3A16%7D%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u67E5%u627E%u540D%u5B57%u53EB%22wangwu%22%u5E76%u4E14%u5E74%u9F84%u7B49%u4E8E%2013%20%u7684%uFF0C%u628A%u6027%u522B%u6539%u6210%22%u7537%22%0A%0A%60%60%60%0Adb.user.update%28%7B%22name%22%3A%22wangwu%22%2C%22age%22%3A13%7D%2C%7B%26%2336%3Bset%3A%7B%22sex%22%3A%22%u7537%22%7D%7D%29%0A%60%60%60%0A%0A%u5982%u679C%u4E0D%u4F7F%u7528%5C%24set%20%u4F1A%u5C06%u6570%u636E%u6574%u4E2A%u66FF%u6362%u6389%0A%0A%23%23%23%23%20%u6279%u91CF%u4FEE%u6539%u6570%u636E%28%u66F4%u6539%u6240%u6709%u5339%u914D%u7684%u9879%u76EE%29%0A%0A%u67E5%u627E%u5E74%u9F84%u7B49%u4E8E%2013%20%u5C81%u7684%uFF0C%u628A%u6240%u6709%u4EBA%u7684%u6027%u522B%u6539%u6210%22%u7537%22%0A%0A%60%60%60%0Adb.user.update%28%7B%22name%22%3A13%7D%2C%7B%26%2336%3Bset%3A%7B%22sex%22%3A%22%u7537%22%7D%7D%2C%7Bmulti%3Atrue%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u67E5%u627E%u540D%u5B57%u53EB%22Lisi%22%u7684%uFF0C%u628A%u5E74%u9F84%u52A0%2250%22%0A%0A%60%60%60%0Adb.user.update%28%7B%22name%22%3A%22Lisi%22%7D%2C%7B%26%2336%3Binc%3A%7B%22age%22%3A50%7D%7D%2Cfalse%2Ctrue%29%3B%0A%60%60%60%0A%0A%23%23%23%23%20%u67E5%u627E%u540D%u5B57%u53EB%22Lisi%22%u7684%uFF0C%u628A%u5E74%u9F84%u52A0%2250%22%u540D%u5B57%u6539%u4E3A%22hoho%22%0A%0A%60%60%60%0Adb.user.update%28%7B%22name%22%3A%22Lisi%22%7D%2C%7B%26%2336%3Binc%3A%7B%22age%3A50%7D%2C%26%2336%3Bset%7B%22name%22%3A%22hoho%22%7D%7D%2Cfalse%2Ctrue%29%3B%0A%60%60%60%0A%0A%23%23%206.%u5220%u9664%u6570%u636E%0A%0A%23%23%23%23%20%u628A%22name%22%u4E3A%22wangwu111%22%u7684%u6240%u6709%u6570%u636E%u5220%u9664%0A%0A%60%60%60%0Adb.user.remove%28%7B%22name%22%3A%22wangwu111%22%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u628A%22name%22%u4E3A%22wangwu111%22%u7684%u4E00%u6761%u6570%u636E%u5220%u9664%0A%0A%60%60%60%0Adb.user.remove%28%7B%22name%22%3A%22wangwu111%22%7D%2C%7BjustOne%3Atrue%7D%29%0A%60%60%60%0A%0A%23%23%207.%20%u67E5%u8BE2%u8BED%u53E5%u6267%u884C%u65F6%u95F4%0A%0A%60%60%60%0Adb.user.find%28%7B%22name%22%3A%22wangwu%22%7D%29.explain%28%22executionStats%22%29%0A%60%60%60%0A%0A%23%23%208.%u7D22%u5F15%0A%0A%23%23%23%23%20%u521B%u5EFA%u7D22%u5F15%0A%0A1%20%u8868%u793A%u5347%u5E8F%0A-1%20%u8868%u793A%u964D%u5E8F%0A%22username%22%u4E3A%u5217%u540D%0A%0A%60%60%60%0Adb.user.ensureIndex%28%7B%22username%22%3A1%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u83B7%u53D6%u5F53%u524D%u96C6%u5408%u7684%u7D22%u5F15%0A%0A%60%60%60%0Adb.user.getIndexes%28%29%0A%60%60%60%0A%0A%23%23%23%23%20%u5220%u9664%u7D22%u5F15%0A%0A%60%60%60%0Adb.user.dropIndex%28%7B%22username%22%3A1%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u590D%u5408%u7D22%u5F15%0A%0A%60%60%60%0Adb.user.ensureIndex%28%7B%22username%22%3A1%2C%22age%22%3A-1%7D%29%0A%60%60%60%0A%0A%u5982%u679C%u53EA%u7528%u540E%u9762%u7684%u5B57%u6BB5%u67E5%u8BE2%20%u4E0D%u4F1A%u547D%u4E2D%u7D22%u5F15%0A%0A%23%23%23%23%20%u521B%u5EFA%u7D22%u5F15%u65F6%u547D%u540D%0A%0A%60%60%60%0Adb.user.ensureIndex%28%7B%22username%22%3A1%7D%2C%7B%22name%22%3A%22userindex%22%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u521B%u5EFA%u552F%u4E00%u7D22%0A%0A%60%60%60%0Adb.user.ensureIndex%28%7B%22userid%22%3A1%7D%2C%7B%22unique%22%3Atrue%7D%29%0A%60%60%60%0A%0A%23%23%20%u8D26%u6237%u6743%u9650%u7BA1%u7406%0A%0A-%201.%u6570%u636E%u5E93%u7528%u6237%u89D2%u8272%3Aread%u3001readWrite%3B%0A-%202.%u6570%u636E%u5E93%u7BA1%u7406%u89D2%u8272%3AadAdmin%u3001adOwner%u3001userAdmin%3B%0A-%203.%u96C6%u7FA4%u7BA1%u7406%u89D2%u8272%3AclusterAdmin%u3001clusterManager%u3001clusterMonitor%u3001hostManager%3B%0A-%204.%u5907%u4EFD%u6062%u590D%u89D2%u8272%3Abackup%u3001restore%3B%0A-%205.%u6240%u6709%u6570%u636E%u5E93%u89D2%u8272%3AreadAnyDatabase%u3001readWriteAnyDatabase%u3001userAdminAnyDatabase%u3001dbAdminAnyDatabase%0A-%206.%u8D85%u7EA7%u7BA1%u7406%u5458%3Aroot%0A%0A%23%23%23%23%20%u521B%u5EFA%u8D85%u7EA7%u7BA1%u7406%u5458%u8D26%u6237%0A%0A-%201.use%20admin%20%u8FDB%u5165%20admin%20%u6570%u636E%u5E93%0A-%202.show%20users%20%u663E%u793A%u6240%u6709%u7BA1%u7406%u5458%u8D26%u6237%u548C%u6743%u9650%0A-%203.%u521B%u5EFA%u8D85%u7EA7%u7BA1%u7406%u5458%0A%0A%60%60%60%0Adb.createUser%28%7B%0A%09user%3A%26apos%3Badmin%26apos%3B%2C%0A%09pwd%3A%26apos%3B123456%26apos%3B%2C%0A%09roles%5B%7Brole%3A%26apos%3Broot%26apos%3B%2Cdb%3A%26apos%3Badmin%26apos%3B%7D%5D%0A%7D%29%0A%60%60%60%0A%0A-%204.%u4FEE%u6539%20mongodb%20%u6570%u636E%u5E93%u914D%u7F6E%u6587%u4EF6%28MongoDB%5CServer%5C4.0%5Cvin%5Cmongod.cfg%29%0A%0A%60%60%60%0Asecurity%3A%0A%09authorization%3Aenabled%0A%60%60%60%0A%0A-%205.%u4F7F%u7528%u8D85%u7EA7%u7BA1%u7406%u5458%u8D26%u6237%u94FE%u63A5%u6570%u636E%u5E93%0A%0A%60%60%60%0Amongon%20admin%20-u%20%u7528%u6237%u540D%20-p%20%u5BC6%u7801%0A%0A//%20%u8FDC%u7A0B%u94FE%u63A5%u6570%u636E%u5E93%0A//%20mongon%20192.168.1.200%3A27017/%u6570%u636E%u5E93%20-u%20%u7528%u6237%u540D%20-p%20%u5BC6%u7801%0A%60%60%60%0A%0A-%206.%u7ED9%u67D0%u4E2A%u6570%u636E%u5E93%u6DFB%u52A0%u7BA1%u7406%u5458%u8D26%u6237%0A%0A%60%60%60%0Adb.createUser%28%7B%0A%09user%3A%26apos%3Bdbadmin%26apos%3B%2C%0A%09pwd%3A%26apos%3B123456%26apos%3B%2C%0A%09roles%5B%7Brole%3A%26apos%3BdbOwner%26apos%3B%2Cdb%3A%26apos%3B%u6570%u636E%u5E93%26apos%3B%7D%5D%0A%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u5220%u9664%u7BA1%u7406%u5458%u8D26%u6237%0A%0A%60%60%60%0Adb.dropUser%28%26apos%3Badmin%26apos%3B%29%0A%60%60%60%0A%0A%23%23%23%23%20%u4FEE%u6539%u7528%u6237%u5BC6%u7801%0A%0A%60%60%60%0Adb.updateUser%28%22admin%22%2C%7Bpwd%3A%22password%22%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u5BC6%u7801%u8BA4%u8BC1%0A%0A%60%60%60%0Adb.auth%28%22admin%22%2C%22password%22%29%0A%60%60%60%0A%0A%23%23%20%u805A%u5408%u7BA1%u9053%uFF08aggregate%28%u3010%7B%7D%u3011%29%29%0A%0A%23%23%23%20%u7BA1%u9053%u64CD%u4F5C%u7B26%0A%0A-%20%5C%24project%3A%u589E%u52A0%u3001%u5220%u9664%u3001%u91CD%u547D%u540D%u5B57%u6BB5%0A-%20%5C%24match%3A%u6761%u4EF6%u5339%u914D%u3002%u53EA%u6EE1%u8DB3%u6761%u4EF6%u7684%u6587%u6863%u624D%u80FD%u8FDB%u5165%u4E0B%u4E00%u9636%u6BB5%0A-%20%5C%24limit%3A%u9650%u5236%u7ED3%u679C%u7684%u6570%u91CF%0A-%20%5C%24skip%3A%u8DF3%u8FC7%u6587%u6863%u7684%u6570%u91CF%0A-%20%5C%24sort%3A%u6761%u4EF6%u6392%u5E8F%0A-%20%5C%24group%3A%u6761%u4EF6%u7EC4%u5408%u7684%u7ED3%u679C%20%u7EDF%u8BA1%0A-%20%5C%24lookup%3A%u7528%u4EE5%u5F15%u7528%u5176%u4ED6%u96C6%u5408%u7684%u6570%u636E%0A%0A%23%23%23%20%u7BA1%u9053%u8868%u8FBE%u5F0F%0A%0A-%20%5C%24addToSet%3A%u5C06%u6587%u6863%u6307%u5B9A%u5B57%u6BB5%u53BB%u91CD%0A-%20%5C%24max%3A%u6587%u6863%u6307%u5B9A%u5B57%u6BB5%u6700%u5927%u503C%0A-%20%5C%24min%3A%u6587%u6863%u6307%u5B9A%u5B57%u6BB5%u6700%u5C0F%u503C%0A-%20%5C%24sum%3A%u6587%u6863%u6307%u5B9A%u5B57%u6BB5%u6C42%u548C%0A-%20%5C%24avg%3A%u6587%u6863%u6307%u5B9A%u5B57%u6BB5%u6C42%u5E73%u5747%0A-%20%5C%24gt%3A%u5927%u4E8E%u7ED9%u5B9A%u503C%0A-%20%5C%24lt%3A%u5C0F%u4E8E%u7ED9%u5B9A%u503C%0A-%20%5C%24gte%3A%u5927%u4E8E%u7B49%u4E8E%u7ED9%u5B9A%u503C%0A-%20%5C%24lte%3A%u5C0F%u4E8E%u7B49%u4E8E%u7ED9%u5B9A%u503C%0A%0A%23%23%23%20%u4F7F%u7528%u7BA1%u9053%0A%0A%23%23%23%23%20%u53EA%u663E%u793A%u60F3%u8981%u7684%u5B57%u6BB5%28%5C%24project%29%0A%0A%60%60%60%0Adb.order.aggreate%28%5B%0A%09%7B%26%2336%3Bproject%3A%7B%26apos%3Border_id%26apos%3B%3A1%2C%26apos%3Btrade_no%26apos%3B%3A1%2C%26apos%3Ball_price%26apos%3B%3A1%7D%7D%0A%5D%29%0A%0A//%u7B49%u540C%u4E8E%0A%0Adb.order.find%28%7B%7D%2C%7B%26apos%3Border_id%26apos%3B%3A1%2C%26apos%3Btrade_no%26apos%3B%3A1%2C%26apos%3Ball_price%26apos%3B%3A1%7D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u53EA%u663E%u793A%u60F3%u8981%u7684%u5B57%u6BB5%u4E14%u603B%u4EF7%u683C%u5927%u4E8E%u7B49%u4E8E%2090%20%u7684%u6570%u636E%0A%0A%60%60%60%0Adb.order.aggreate%28%5B%0A%09%7B%26%2336%3Bproject%3A%7B%26apos%3Border_id%26apos%3B%3A1%2C%26apos%3Btrade_no%26apos%3B%3A1%2C%26apos%3Ball_price%26apos%3B%3A1%7D%7D%2C%0A%09%7B%26%2336%3Bmatch%3A%7B%22all_price%22%3A%7B%26%2336%3Bgte%3A90%7D%7D%7D%0A%5D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u4EE5%20order_id%20%u5206%u7EC4%u5E76%u4E14%u7B97%u51FA%u7EC4%u5185%20num%20%u7684%u548C%0A%0A%60%60%60%0Adb.order_item.aggregate%28%5B%0A%09%7B%0A%09%09%26%2336%3Bgroup%3A%7B_id%3A%22%26%2336%3Border_id%22%2Ctotal%3A%7B%26%2336%3Bsum%3A%22%26%2336%3Bnum%22%7D%7D%0A%09%7D%0A%5D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u5BF9%20all_price%20%u8FDB%u884C%u964D%u5E8F%u6392%u5E8F%0A%0A%60%60%60%0Adb.order_item.aggregate%28%5B%0A%09%7B%0A%09%09%26%2336%3Bsort%3A%7B%22all_price%22%3A-1%7D%0A%09%7D%0A%5D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u8DF3%u8FC7%201%20%u6761%u67E5%u8BE2%0A%0A%60%60%60%0Adb.order.aggregate%28%5B%0A%09%7B%0A%09%09%26%2336%3Bskip%3A1%0A%09%7D%0A%5D%29%0A%60%60%60%0A%0A%23%23%23%23%20%u8868%u4E0E%u8868%u4E4B%u95F4%u7684%u5173%u8054%u67E5%u8BE2%0A%0A%60%60%60%0Adb.order.aggregate%28%5B%0A%09%7B%0A%09%09%26%2336%3Blookup%3A%7B%0A%09%09%09from%3A%22order_item%22%2C%0A%09%09%09localField%3A%22order_id%22%2C%0A%09%09%09foreignField%3A%22order_id%22%2C%0A%09%09%09as%3A%22items%22%0A%09%09%7D%0A%09%7D%0A%5D%29%0A%60%60%60%0A%0A%23%23%20%u5BFC%u5165%u5BFC%u51FA%u6570%u636E%u5E93%0A%0A%23%23%23%23%20%u5BFC%u51FA%u5907%u4EFD%u6570%u636E%u5E93%0A%0A%60%60%60%0Amongodump%20-h%20IP%u5730%u5740%20-d%20%u6570%u636E%u5E93%u540D%u79F0%20-o%20%u5BFC%u51FA%u8DEF%u5F84%0A%60%60%60%0A%0A%u53C2%u6570%u8BF4%u660E%0A%0A-%20-h%3AmongoDB%20%u6240%u5728%u7684%u670D%u52A1%u5668%u5730%u5740%uFF0C%u4F8B%u5982%uFF1A127.0.0.1%uFF0C%u5F53%u7136%u4E5F%u53EF%u4EE5%u6307%u5B9A%u7AEF%u53E3%uFF1A127.0.0.1%3A27017%0A-%20-d%3A%u9700%u8981%u5907%u4EFD%u7684%u6570%u636E%u5E93%u5B9E%u4F8B%uFF0C%u4F8B%u5982%uFF1Atest%0A-%20-o%3A%u5907%u4EFD%u6570%u636E%u5E93%u5B58%u653E%u7684%u4F4D%u7F6E%0A%0A%23%23%23%23%20%u5BFC%u5165%u6062%u590D%u6570%u636E%u5E93%0A%0A%60%60%60%0Amongorestore%20-h%20IP%u5730%u5740%20-d%20%u6570%u636E%u5E93%u540D%u79F0%20%u5BFC%u5165%u8DEF%u5F84%0A%60%60%60%0A%0A%u53C2%u6570%u8BF4%u660E%0A%0A-%20-h%3AmongoDB%20%u6240%u5728%u7684%u670D%u52A1%u5668%u5730%u5740%uFF0C%u4F8B%u5982%uFF1A127.0.0.1%uFF0C%u5F53%u7136%u4E5F%u53EF%u4EE5%u6307%u5B9A%u7AEF%u53E3%uFF1A127.0.0.1%3A27017%0A-%20-d%3A%u9700%u8981%u6062%u590D%u7684%u6570%u636E%u5E93%u5B9E%u4F8B%uFF0C%u4F8B%u5982%uFF1Atest%0A-%20--drop%3A%u6062%u590D%u7684%u65F6%u5019%uFF0C%u5148%u5220%u9664%u5F53%u524D%u6570%u636E%uFF0C%u7136%u540E%u6062%u590D%u5907%u4EFD%u7684%u6570%u636E%u3002%u5C31%u662F%u8BF4%uFF0C%u6062%u590D%u540E%uFF0C%u5907%u4EFD%u540E%u6DFB%u52A0%u6DFB%u52A0%u4FEE%u6539%u7684%u6570%u636E%u90FD%u4F1A%u88AB%u5220%u9664%uFF0C%u614E%u7528%uFF01%0A%0A%23%23%23%23%20mongodb%20%u6570%u636E%u5E93%u6709%u7528%u6237%u540D%u5BC6%u7801%u8BA4%u8BC1%u7684%u53C2%u8003%u4E0B%u9762%u547D%u4EE4%0A%0A%60%60%60%0Amongondump%20-h%20localhost%3A27017%20-d%20test%20-u%20test%20-p%20testpwd%20-o%20D%3A%5Cdump%0A%0A%0Amongorestore%20-h%20localhost%3A27017%20-d%20test%20-c%20order%20--dir%20d%3A%5Cdump%5Ctest%5Ctest.bson%20-u%20test%20-p%20testpwd%0A%60%60%60%0A"
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

  async created() {
    // const mineMarkdown = require("../assets/markdown/qianduan.md");
    // console.log(mineMarkdown);
    // this.msg = mineMarkdown;

    await this.getdata();
    if(this.$route.query.id){
      for(let item of this.markdownJson){
        console.log(this.$route)
        if(this.$route.query.id==item.id){
          this.title=item.title
          this.escapeString=item.msg
        }
      }
    }else{
      this.title = this.markdownJson[0].title;
    }
  },
  // mounted(){
  //   this.getdata();
  // },
  methods: {
    getdata() {
      //请求数据
      // fetch("https://mock.yonyoucloud.com/mock/17267/markdown")
      // return new Promise((resolve,reject)=>{
      //   fetch("https://getman.cn/mock/dante/001")
      //   .then(res => res.json())
      //   .then(json => {
      //     // console.log(json);
      //     this.markdownJson = json;
      //     resolve(json)
      //   }).catch((err)=>{
      //     reject(err)
      //   });
      // })
        return fetch("https://getman.cn/mock/dante/001")
        .then(res => res.json())
        .then(json => {
          // console.log(json);
          this.markdownJson = json;
          resolve(json)
        }).catch((err)=>{
          reject(err)
        });


    },
    clickTitle(item) {
      if (this.$route.query.id !== item.id) {
        this.$router.push(`/liaojie?id=${item.id}`);
        // this.$router.go(0);
      }
      console.log(item);
      this.title = item.title;
      this.escapeString = item.msg;
    },
    clickButton() {
      if (this.showType == 1) {
        this.showType = 2;
      } else {
        this.showType = 1;
      }
    },
    saveMd() {
      console.log("save");
    },
    mdChange(value) {
      this.escapeString = value;
      // console.log(escape(value))
    }
  },
  components: {
    "vue-markdown": VueMarkdown
  }
};
</script>

<style scoped lang="less">
.liaojie {
  display: flex;
  .lj_left {
    width: 200px;
    border-right: 1px solid #000;
  }
  .lj_right {
    display: flex;
    flex: 1;
    align-items: center;
    flex-direction: column;
    .lj_markdown {
      width: 920px;
    }
    .md_title {
    }
  }
}
</style>

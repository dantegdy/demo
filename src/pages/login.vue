<template>
  <div class="login">
    <h2 class="login_title">登陆</h2>
    <div class="login_box">
      <div class="login_input">
        <div class="inpot_title">用户名：</div>
        <el-input v-model="username" placeholder="请输入用户名"></el-input>
      </div>
      <div class="login_input">
        <div class="inpot_title">密码：</div>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </div>
      <router-link to="/app/register">立即注册</router-link>
      <div class="login_button_box">
        <div class="login_button" @click="doLogin" >确认</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    doLogin() {
      console.log(this.username, this.password);
      let patt_username = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/); //字母开头，允许5-16字节，允许字母数字下划线
      if (!patt_username.test(this.username)) {
        console.log("不合法");
        this.$alert(
          "用户名格式字母开头，允许5-16字节，允许字母数字下划线",
          "登陆失败",
          {
            confirmButtonText: "确定",
            callback: action => {
              this.username = "";
              this.passworld = "";
            }
          }
        );
        return;
      }
      let patt_password = new RegExp(/^[a-zA-Z]\w{5,17}$/); //以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      if (!patt_password.test(this.passworld)) {
        console.log("不合法");
        this.$alert(
          "密码格式以字母开头，长度在6~18之间，只能包含字母、数字和下划线",
          "登陆失败",
          {
            confirmButtonText: "确定",
            callback: action => {
              this.username = "";
              this.passworld = "";
            }
          }
        );
        return;
      }
      var url = `http://49.234.229.70:8090/users/login`;
      // var url = `http://127.0.0.1:8090/users/login`;

      fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log("Success:", response);
          if (response.type === 200) {
            console.log("登陆成功 ");
            window.localStorage.username = response.msg.username;
            window.localStorage.user_id = response.msg.user_id;
            this.$store.commit({
              type:'loginSucc',
              username: response.msg.username
            });
            this.$store.state.user_id=response.msg.user_id
            this.username = "";
            this.passworld = "";
            this.$router.push("/app/wode");
          }
        });
    }
  }
};
</script>

<style lang="less">
.login {
  width: 500px;
  height: 500px;
  margin: 100px auto;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_title {
    text-align: center;
    margin: 50px 0;
  }
  .login_input {
    display: flex;
    width: 300px;
    margin-bottom: 50px;
    .inpot_title {
      width: 90px;
      padding-top: 12px;
    }
  }
  .login_button_box {
    display: flex;
    padding-top: 50px;
    justify-content: center;
    .login_button {
      background-color: #389d70;
      padding: 12.8px 30px;
      color: #fff;
      border-radius: 5px;
      font-size: 18px;
    }
  }
}
</style>

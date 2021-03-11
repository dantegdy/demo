<template>
  <div class="register">
    <h1 style="text-align:center">立即注册</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      let patt_phone = new RegExp(
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      );
      setTimeout(() => {
        if (!patt_phone.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入用户名"));
      }
      let patt_username = new RegExp(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/); //字母开头，允许5-16字节，允许字母数字下划线

      if (!patt_username.test(value)) {
        // this.$refs.ruleForm.validateField("username");
        callback(new Error("字母开头，允许5-16字节，允许字母数字下划线"));
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        phone: ""
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
        phone: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = `http://127.0.0.1:8090/users/register`;

          fetch(url, {
            method: "POST", // or 'PUT'
            body: JSON.stringify({
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              phone: this.ruleForm.phone
            })
          })
            .then(res => res.json())
            .catch(error => console.error("Error:", error))
            .then(response => {
              console.log("Success:", response);
              if (response.type === 200) {
                console.log("注册成功 ");
              }
            });
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 500px;
  margin: 100px auto;
  border: 1px solid #000;
  padding-right: 30px;
}
</style>

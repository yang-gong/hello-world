<template>
  <div class="login-bg">
    <div class="login-box">
      <el-form ref="form">
        <div>
          <h3>XXXX系统</h3>
        </div>
        <el-form-item>
          <el-input placeholder="用户名" v-model="uname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" v-model="pwd"></el-input>
        </el-form-item>

        <el-button class="login-btn" type="primary" @click="login"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uname: "",
      pwd: "",
    };
  },
  methods: {
    login() {
      var sha256 = require("js-sha256").sha256;
      //var that=this;
      axios
        .get(
         '/data-view/login?username=' + this.uname + '&password=' + sha256(this.pwd) 
        )
        .then(function (resp) {
          if ( resp.data.status === "succ") {
            alert("登陆成功");
            console.log(resp);
            this.$router.push({
                path:'/index'
            })
          } else {
              console.log(resp);
            alert(resp.data.result);
            // alert("登陆失败")
          }
        })
        .catch(function (err) {
          console.log(err);
           alert("登陆失败")
        });
    },
  },
};
</script>
<style scoped>
.login-bg {
  width: 100%;
  height: 100%;
  background-color: #2e3353;
}
.login-box {
  width: 340px;
  height: 300px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  top: 30%;
  padding: 25px;
}
.login-btn {
  width: 100%;
}
</style>

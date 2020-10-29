<template>
  <el-container class="index-bg">
    <el-header class="index-head">
      <div class="btn-setting-box">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setPwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="showInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="index-body-box">
      <el-aside class="index-left" width="200px">Aside</el-aside>
      <div :class="maindiv">
        <h1>{{ msg }}</h1>
      </div>
      <!--  <el-main>Main</el-main>-->
    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      userName: "系统管理员",
      maindiv: "",
      msg: "",
    };
  },
  methods: {
      handleCommand(command) {
      if (command === "logout") {
        // logoutAPI().then((res) => {
        //   if (res.status === "succ") {
        //     cleanSessionStorage();
            window.location.href = "/";
        //   } else {
        //     this.$message.warning("操作失败，请稍后重试。。。");
        //   }
        // });
      }
      //  else if (command === "setPwd") {
      //   this.setPwdFormShow = true;
      // } else if (command === "showInfo") {
      //   this.userInfoShow = true;
      // }
    },
    // handleCommand(command) {
    //   if (command == "a") {
    //     this.maindiv = "red_box";
    //     // this.msg = "我要修改密码";

    //     // this.$message('click on item ' + command);
    //   } else if (command == "b") {
    //     this.maindiv = "green_box";
    //     // this.msg = "我是个人信息";
    //   } else if (command == "c") {
    //     this.maindiv = "black_box ";
    //     // this.msg = "我要退出";
    //   }
    // },
  },
};
</script>

<style scoped>
.index-head {
  background-color: #5690fd;
  box-shadow: 0 5px 10px #ddd;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.index-bg .index-body-box {
  height: 100%;
}
.index-left {
  background-color: #2e3353;
  height: 400px;
  transition: left 0.23s ease-in-out;
}
.btn-setting-box {
  height: 35px;
  margin: 15px;
  float: right;
}
.red_box {
  height: 400px;
  width: 100%;
  background-color: red;
}
.green_box {
  height: 400px;
  width: 100%;
  background-color: green;
}
.black_box {
  height: 400px;
  width: 100%;
  background-color: wheat;
}
.btn-setting-box .el-dropdown {
  color: #fff;
}
</style>

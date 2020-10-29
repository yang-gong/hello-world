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
                    <el-dropdown-item command="uInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
    <el-container class="index-body-box">
        <el-aside class="index-left" width="200px">Aside</el-aside>
        <!--   <div :class="maindiv">
            <h1>{{ msg }}</h1>
        </div>-->
        <el-main>
            main
        </el-main>
    </el-container>
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form">

            <el-form-item label="用户名">
                <el-input v-model="uname"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="tel"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-input v-model="dept"></el-input>
            </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        -->
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose1">
        <el-form :model="resetForm" :rules="resetFormRules" ref="resetForm" status-icon label-width="100px">
            <el-form-item label="旧密码：" prop="password">
                <el-input type="password" v-model="resetForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="newpwd">
                <el-input type="password" v-model="resetForm.newpwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="newpassword1">
                <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native.prevent="toAmend">确认修改</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</el-container>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请输入新密码"));
            } else if (value.toString().length < 6 || value.toString().length > 18) {
                callback(new Error("密码长度为6-18位"));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.resetForm.newpwd) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };

        return {
            //zhy
            userName: "系统管理员",
            msg: "",
            dialogVisible: false,
            dialogVisible1: false,
            uname: "",
            tel: "",
            dept: "",
            email: "",
            paa: '',
            resetForm: {
                //传给后台所需要的参数
                newpassword1: "",
                password: "",
                username: "" //此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
            },
            resetFormRules: {
                password: [{
                    required: true,
                    message: "请输入旧密码",
                    trigger: 'blur'
                }],
                newpwd: [{
                    required: true,
                    validator: validatePass,
                    trigger: 'blur'
                }],
                newpassword1: [{
                    required: true,
                    validator: validatePass2,
                    trigger: "blur"
                }]
            }
        }

    },
    methods: {
        handleCommand(command) {

            if (command === "logout") {

                window.location.href = "/";

            } else if (command === "setPwd") {
                this.dialogVisible1 = true
            } else if (command === "uInfo") {

                var uInfo = JSON.parse(window.localStorage.getItem("userInfo"))

                this.uname = uInfo.username;
                this.tel = uInfo.tel;
                this.dept = uInfo.department;
                this.email = uInfo.email;
                this.paa = uInfo.password;
                this.dialogVisible = true
            }
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleClose1() {
            this.dialogVisible1 = false
        },
        toAmend() {
            this.$refs.resetForm.validate(valid => {
                if (valid) {
                    //     //这里的api.materialQuery.toAmend是调用前期我们统一的api接口url路径，不作参考 ，只要把后台需要的字段正常传进去即可 
                    //     api.materialQuery.toAmend(this.resetForm)
                    //         .then(res => {
                    //             if (res.code === 2) {
                    //                 this.$message({
                    //                     message: res.msg,
                    //                     type: "error",
                    //                     duration: "2000"
                    //                 });
                    //                 return false;
                    //             }
                    //             if (res.code === 0) {
                    //                 this.$message.success("修改成功,3秒后跳转到登录页！");
                    //                 setTimeout(() => {
                    //                     this.logout(); //调用跳转到登陆页的方法
                    //                 }, 3000);
                    //             }

                    //         })
                    //         .catch(() => {});
                }
            });
        },
        //这是修改成功后重新返回登陆页的方法，看个人需要自行调整
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login`);
        }
    },

}
</script>

<style scoped>
.index-head {
    background-color: #5690fd;
    box-shadow: 0 5px 10px #ddd;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

.index-bg {
    height: 100%;
}

.index-body-box {
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

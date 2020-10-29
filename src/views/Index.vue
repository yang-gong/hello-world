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
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="checkPass1">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</el-container>
</template>

<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
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

            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            rules: {
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur'
                }],
                age: [{
                    validator: checkAge,
                    trigger: 'blur'
                }]
            }
        };

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
                this.dialogVisible = true;
            }
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleClose1() {
            this.dialogVisible1 = false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
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

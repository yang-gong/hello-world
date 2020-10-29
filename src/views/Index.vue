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
        <el-aside class="index-left" width="250px">
            <el-row class="tac">
                <el-col :span="12" class="el-col-span">
                    <h5>主页</h5>
                    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>导航一</span>
                            </template>
                            <el-menu-item-group>

                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>

            </el-row>
        </el-aside>
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
    <el-dialog width="400px" title="修改密码" class="black-bar" :visible.sync="setPwdFormShow" :before-close="closeSetPwdDialogFunc">
        <el-form :model="setPwdFormData" :rules="setPwdFormRules" ref="pwdForm" size="small" label-width="100px">
            <el-form-item label="原密码" prop="oldPwd" label-width="120px">
                <el-input v-model="setPwdFormData.oldPwd" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd1" label-width="120px">
                <el-input v-model="setPwdFormData.newPwd1" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPwd2" label-width="120px">
                <el-input v-model="setPwdFormData.newPwd2" type="password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" :loading="setPwdBtloading" @click="setPwdSaveFunc">确 定</el-button>
        </div>
    </el-dialog>
</el-container>
</template>

<script>
export default {
    data() {
        // 验证新密码1
        var validatePass1 = (rule, value, callback) => {
            if (value.length > 20 || value.length < 6) {
                callback(new Error('请输入6 到 20 个字符'))
            } else {
                if (this.setPwdFormData.newPwd2 !== '') {
                    this.$refs.pwdForm.validateField('newPwd2')
                }
                callback()
            }
        }
        // 验证新密码2
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.setPwdFormData.newPwd1) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            //zhy
            userName: "系统管理员",
            msg: "",
            dialogVisible: false,
            uname: "",
            tel: "",
            dept: "",
            email: "",
            // 是否显示修改密码界面
            setPwdFormShow: false,
            // 修改密码保存加载按钮
            setPwdBtloading: false,
            // 修改密码表单值
            setPwdFormData: {},
            // 修改密码表单验证
            setPwdFormRules: {
                oldPwd: [{
                        required: true,
                        message: '请输入原密码',
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "message: '长度在 6 到 20 个字符'",
                        trigger: 'blur'
                    }
                ],
                newPwd1: [{
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass1,
                        trigger: 'blur'
                    }
                ],
                newPwd2: [{
                        required: true,
                        message: '请再次输入新密码',
                        trigger: 'blur'
                    },
                    {
                        validator: validatePass2,
                        trigger: 'blur'
                    }
                ]
            },
            // 是否显示用户信息界面
            userInfoShow: false
        };

    },
    methods: {
        handleCommand(command) {

            if (command === "logout") {

                window.location.href = "/";

            } else if (command === "setPwd") {
                this.setPwdFormShow = true
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
        setPwdSaveFunc() {
            this.setPwdBtloading = true
            // var sha256 = require('js-sha256').sha256 // 引入sha256库
            this.$refs.pwdForm.validate(valid => {
                if (valid) {
                    // setPwdAPI({
                    //         username: this.userInfo.username,
                    // oldPwd: sha256(this.setPwdFormData.oldPwd),
                    //         newPwd: sha256(this.setPwdFormData.newPwd1)
                    //     })
                    //     .then(res => {
                    //         if (res.status === 'succ') {
                    //             this.$message.success('修改成功')
                    //             this.setPwdFormShow = false
                    //         } else {
                    //             this.$message.warning(res.result)
                    //         }
                    //     })
                    //     .finally(() => {
                    //         this.setPwdBtloading = false
                    //     })
                } else {
                    this.setPwdBtloading = false
                    return false
                }
            })
        },
        // 关闭修改密码界面
        closeSetPwdDialogFunc(done) {
            this.$nextTick(() => {
                this.setPwdFormData = {}
                this.$refs.pwdForm.resetFields()
            })
            this.setPwdBtloading = false
            done()
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose1(key, keyPath) {
            console.log(key, keyPath);
        }

    }

};
</script>

<style scoped>
.el-menu-item-group {
    margin-left: 0px;
}

.el-col-span {
    width: 100%;
}

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

    transition: left 0.23s ease-in-out;
}

.btn-setting-box {
    height: 35px;
    margin: 15px;
    float: right;
}

.btn-setting-box .el-dropdown {
    color: #fff;
}
</style>

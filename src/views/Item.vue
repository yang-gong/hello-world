<template>
<div class="content-box">
    <el-col :span="24" class="">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>用户管理</span>
            </div>
            <!-- 查询表单-->
            <el-form :inline="true" :model="query" size="small">
                <el-form-item label="账号">
                    <el-input v-model="query.username" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="query.relname" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="query.tel" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-tooltip content="查询" placement="top">
                            <el-button plain icon="el-icon-search" @click="onQuery"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-tooltip content="查看" placement="top" v-permission:user:view>
                            <el-button type="primary" icon="el-icon-view" @click="formViewFun(true)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="新增" placement="top" v-permission:user:add>
                            <el-button type="primary" icon="el-icon-plus" @click="formViewFun(false,true)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="修改" placement="top" v-permission:user:update>
                            <el-button type="primary" icon="el-icon-edit" @click="formViewFun(false)"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" v-permission:user:delete>
                            <el-button type="primary" icon="el-icon-delete" @click="delUserFun"></el-button>
                        </el-tooltip>
                        <el-tooltip content="密码重置" placement="top" v-permission:user:resetPwd>
                            <el-button type="primary" icon="el-icon-sold-out" @click="resetPwdFun"></el-button>
                        </el-tooltip>
                        <el-tooltip content="授权" placement="top" v-permission:user:setRoles>
                            <el-button type="primary" icon="el-icon-check" @click="formRoleFun"></el-button>
                        </el-tooltip>
                    </el-button-group>

                </el-form-item>
            </el-form>
            <!-- 结果列表-->
            <el-table :data="tableData" :header-cell-style="{background:'#EDF7FF'}" @selection-change="tableSelected" v-loading="tableLoading" border stripe style="width: 100%" class="scrollbar-table" height="680">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="username" label="账号" width="100">
                </el-table-column>
                <el-table-column prop="relname" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="120">
                </el-table-column>
                <el-table-column prop="mobile" label="手机号" width="100">
                </el-table-column>
                <el-table-column prop="tel" label="电话" width="100">
                </el-table-column>
                <el-table-column prop="position" label="职位" width="100">
                </el-table-column>
                <el-table-column prop="department" label="部门" width="100">
                </el-table-column>
                <el-table-column prop="company" label="公司" width="100">
                </el-table-column>
                <el-table-column prop="flag" label="状态" width="80">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.flag === '1' ? 'success' : 'danger'" disable-transitions>{{scope.row.flag=== '1'?'启用':'禁用'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
            </el-table>
            <!-- 分页组件-->
            <div class="page-box">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[20, 50, 100, 200]" :page-size="pageSize" :total="pageTotal" @current-change="pageFunPindex" @size-change="pageFunPsize">
                </el-pagination>
            </div>
        </el-card>
    </el-col>
    <!-- 弹出层 用户信息表单 -->
    <el-dialog width="600px" title="用户信息" class="black-bar" :visible.sync="formShow" :before-close="closeUserDialog">
        <el-form :model="formData" :rules="formRules" :disabled="formDisable" ref="userForm" size="small" label-width="100px">
            <el-form-item label="账号" prop="username" label-width="120px">
                <el-input v-model="formData.username" :disabled="this.formData.id!=null&&this.formData.id!=undefined" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="relname" label-width="120px">
                <el-input v-model="formData.relname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" label-width="120px">
                <el-input v-model="formData.mobile" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" label-width="120px" :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
                <el-input v-model="formData.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel" label-width="120px">
                <el-input v-model.number="formData.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="position" label-width="120px">
                <el-input v-model.number="formData.position" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department" label-width="120px">
                <el-input v-model.number="formData.department" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公司" prop="company" label-width="120px">
                <el-input v-model.number="formData.company" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" label-width="120px">
                <el-switch v-model="formData.flag" active-value="1" inactive-value="0" active-text="开启" inactive-text="关闭" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="formData.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="!formDisable">
            <el-button size="small" @click="resetForm('userForm')">重 置</el-button>
            <el-button size="small" type="primary" :loading="formBtloading" @click="formSave">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 弹出层 选择权限 -->
    <el-dialog width="400px" title="选择权限" class="black-bar" :visible.sync="selRoleShow" :before-close="closeSelRoleDialog">
        <el-form :model="formData" :rules="formRules" :disabled="formDisable" ref="selRoleForm" size="small" label-width="100px">
            <el-form-item label="选择角色">
                <el-checkbox-group v-model="checkRoles">
                    <el-checkbox v-for="item in roleAllList" :key="item.key" :label="item.key">{{item.value}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" v-if="!formDisable">
            <el-button size="small" @click="resetForm('selRoleForm')">重 置</el-button>
            <el-button size="small" type="primary" :loading="selRoleBtloading" @click="selRoleSave">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    queryUserAPI,
    addUserAPI,
    updUserAPI,
    findUserAPI,
    delUserAPI,
    resetPwdAPI,
    setUsersRolesAPI
} from '@/api/sysuser'
import {
    selRolesAPI
} from '@/api/select'
export default {
    data() {
        // 手机号验证方法
        var validMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'))
            } else {
                var TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
                if (!TEL_REGEXP.test(value)) {
                    callback(new Error('请输入正确的手机号'))
                }
                callback()
            }
        }
        return {
            query: {
                username: '',
                relname: '',
                mobile: '',
                flag: ''
            },
            selectRow: [],
            tableLoading: false,
            tableData: [],
            pageSize: 20,
            pageIndex: 1,
            pageTotal: 0,
            formShow: false,
            selRoleShow: false,
            formDisable: false,
            formBtloading: false,
            selRoleBtloading: false,
            formRules: {
                username: [{
                        required: true,
                        message: '账号必填',
                        trigger: 'blur'
                    },
                    {
                        min: 4,
                        max: 20,
                        message: "message: '长度在 4 到 20 个字符'",
                        trigger: 'blur'
                    }
                ],
                relname: [{
                    required: true,
                    message: '姓名必填',
                    trigger: 'blur'
                }],
                mobile: [{
                    validator: validMobile,
                    trigger: 'blur'
                }],
                qq: [{
                        required: true,
                        message: 'QQ不能为空',
                        trigger: 'blur'
                    },
                    {
                        type: 'number',
                        message: 'QQ必须为数字值',
                        trigger: 'blur'
                    }
                ]
            },
            formData: {},
            checkRoles: [],
            roleAllList: []
        }
    },
    methods: {
        onQuery() {
            this.tableLoading = true
            queryUserAPI({
                pageSize: this.pageSize,
                pageIndex: this.pageIndex,
                queryUser: this.query
            }).then(response => {
                this.tableData = response.list || []
                this.pageTotal = response.totalNum || 0
                this.tableLoading = false
            })
        },
        // 表单选择
        tableSelected(val) {
            this.selectRow = val
        },
        // 新增 编辑 查看按钮触发
        formViewFun(formDisable, isNew) {
            // 清空表单数据赋新值
            this.formDisable = formDisable

            if (isNew) { // 新增
                this.formShow = true
            } else { // 查看 或修改
                if (!this.selectRow || this.selectRow.length === 0) {
                    this.$message.error('请选择一条记录')
                } else if (this.selectRow.length > 1) {
                    this.$message.error('仅支持选择一条记录,该操作不支持批量')
                } else {
                    var rid = this.selectRow[0].id
                    findUserAPI(rid).then(res => {
                        if (res.status === 'succ') {
                            this.formData = res.result
                            this.formShow = true
                        }
                    })
                }
            }
        },
        // 授权界面
        formRoleFun() {
            if (!this.selectRow || this.selectRow.length === 0) {
                this.$message.error('请选择一条记录')
            } else {
                selRolesAPI().then(res => {
                    this.roleAllList = res || []
                })
                this.selRoleShow = true
            }
        },
        // 保存表单
        formSave() {
            this.formBtloading = true
            this.$refs.userForm.validate(valid => {
                if (valid) {
                    if (this.formData.id) { // 修改
                        updUserAPI(this.formData).then(res => {
                            if (res.status === 'succ') {
                                this.$message.success('修改成功')
                                this.onQuery()
                            } else {
                                this.$message.error(res.result)
                            }
                            this.formBtloading = false
                        })
                    } else { // 新增
                        addUserAPI(this.formData).then(res => {
                            if (res.status === 'succ') {
                                this.$message.success('新增成功')
                                this.onQuery()
                            } else {
                                this.$message.error(res.result)
                            }
                            this.formBtloading = false
                        })
                    }
                } else {
                    this.formBtloading = false
                    return false
                }
            })
        },
        // 保存角色
        selRoleSave() {
            var uids = []
            this.selectRow.forEach(row => {
                uids.push(row.id)
            })
            this.selRoleBtloading = true
            setUsersRolesAPI({
                    uids: uids,
                    rids: this.checkRoles || []
                })
                .then(res => {
                    if (res.status === 'succ') {
                        this.$message.success('保存角色成功')
                        this.onQuery()
                    } else {
                        this.$message.error(res.result)
                    }
                })
                .finally(() => {
                    this.selRoleBtloading = false
                })
        },
        // 删除
        delUserFun() {
            if (!this.selectRow || this.selectRow.length === 0) {
                this.$message.error('请选择一条记录')
            } else if (this.selectRow.length > 1) {
                this.$message.error('该功能不支持批量操作')
            } else {
                var rid = this.selectRow[0].id
                delUserAPI(rid).then(res => {
                    if (res.status === 'succ') {
                        this.$message.success('删除成功')
                        this.onQuery()
                    } else {
                        this.$message.error(res.result)
                    }
                })
            }
        },
        // 密码重置
        resetPwdFun() {
            if (!this.selectRow || this.selectRow.length === 0) {
                this.$message.error('请选择一条记录')
            } else if (this.selectRow.length > 1) {
                this.$message.error('该功能不支持批量操作')
            } else {
                var uid = this.selectRow[0].id
                resetPwdAPI(uid).then(res => {
                    if (res.status === 'succ') {
                        this.$message.success('密码重置成功')
                    } else {
                        this.$message.error(res.result)
                    }
                })
            }
        },
        // 数据表单关闭并清空数据
        closeUserDialog(done) {
            this.$nextTick(() => {
                this.formData = {}
                this.$refs.userForm.resetFields()
            })
            this.formBtloading = false
            done()
        },
        closeSelRoleDialog(done) {
            this.$nextTick(() => {
                this.$refs.selRoleForm.resetFields()
            })
            this.selRoleBtloading = false
            done()
        },
        // 数据表单重置
        resetForm(formName) {
            this.$refs[formName].clearValidate()
            this.$refs[formName].resetFields()
        },
        // 每页条数改变
        pageFunPsize(val) {
            this.pageSize = val
            this.onQuery()
        },
        // 页码改变
        pageFunPindex(val) {
            this.pageIndex = val
            this.onQuery()
        }
    }
}
</script>

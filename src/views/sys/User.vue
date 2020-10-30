<template>
<div class="content-box">
    <el-col :span="24" class="">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="span-span">用户管理</span>
            </div>
            <!-- 查询表单-->
            <el-form :inline="true" size="small">
                <el-form-item label="账号">
                    <el-input placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-tooltip content="查询" placement="top">
                            <el-button plain icon="el-icon-search"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </el-form-item>
                <el-form-item>
                    <el-button-group>
                        <el-tooltip content="查看" placement="top" v-permission:user:view>
                            <el-button type="primary" icon="el-icon-view"></el-button>
                        </el-tooltip>
                        <el-tooltip content="新增" placement="top" v-permission:user:add>
                            <el-button type="primary" icon="el-icon-plus"></el-button>
                        </el-tooltip>
                        <el-tooltip content="修改" placement="top" v-permission:user:update>
                            <el-button type="primary" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" v-permission:user:delete>
                            <el-button type="primary" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                        <el-tooltip content="密码重置" placement="top" v-permission:user:resetPwd>
                            <el-button type="primary" icon="el-icon-sold-out"></el-button>
                        </el-tooltip>
                        <el-tooltip content="授权" placement="top" v-permission:user:setRoles>
                            <el-button type="primary" icon="el-icon-check"></el-button>
                        </el-tooltip>
                    </el-button-group>

                </el-form-item>
            </el-form>
            <el-table :header-cell-style="{background:'#EDF7FF'}" @selection-change="tableSelected" border stripe style=" width: 100%" class="scrollbar-table" height="680">
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

                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
            </el-table>
        </el-card>
    </el-col>

</div>
</template>

<script>
export default {
    methods: {
        tableSelected(val) {
            this.selectRow = val
        },
    }

}
</script>

<style scoped>
.content-box {
    text-align: left;
}
</style>

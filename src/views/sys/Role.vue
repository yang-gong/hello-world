<template>
<div class="content-box">
    <el-col :span="24" class="">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>角色管理</span>
            </div>
            <!-- 查询表单-->
            <el-form :inline="true" size="small">
                <el-form-item label="角色名称">
                    <el-input placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="启用状态">
                    <el-select placeholder="请选择">

                    </el-select>
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
                        <el-tooltip content="查看" placement="top" v-permission:role:view>
                            <el-button type="primary" icon="el-icon-view"></el-button>
                        </el-tooltip>
                        <el-tooltip content="新增" placement="top" v-permission:role:add>
                            <el-button type="primary" icon="el-icon-plus"></el-button>
                        </el-tooltip>
                        <el-tooltip content="修改" placement="top" v-permission:role:update>
                            <el-button type="primary" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" v-permission:role:delete>
                            <el-button type="primary" icon="el-icon-delete"></el-button>
                        </el-tooltip>
                        <el-tooltip content="授权" placement="top" v-permission:role:setPermissions>
                            <el-button type="primary" icon="el-icon-edit"></el-button>
                        </el-tooltip>
                    </el-button-group>

                </el-form-item>
            </el-form>

            <!-- 结果列表-->
            <el-table :data="tableData" :header-cell-style="{background:'#EDF7FF'}" border stripe style="width: 100%" class="scrollbar-table" height="680">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="name" label="角色名称" width="150">
                </el-table-column>
                <el-table-column prop="value" label="角色串" width="150">
                </el-table-column>
                <el-table-column prop="flag" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.flag == '1' ? 'success' : 'danger'" disable-transitions>{{scope.row.flag== '1'?'启用':'禁用'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
            </el-table>
            <!-- 分页组件-->

        </el-card>
    </el-col>

</div>
</template>

<style scoped>
.content-box {
    text-align: left;
}
</style>

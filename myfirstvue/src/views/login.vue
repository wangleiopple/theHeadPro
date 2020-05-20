<template>
    <div>
        <el-card class="box-card login-box ">
            <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户">
                    <el-input type="text" v-model="user.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="user.password" auto-complete="off" v-on:keyup.enter.native="login()"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  v-on:keyup.enter.native="login()" v-on:click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                console.log(this.user.username);
                console.log(this.user.password);
                this.$api.login(this.user.username, this.user.password).then((response) => {
                    console.log(response);
                    this.$router.push({
                        path: "/"
                    });
                }, (error) => {
                    console.log(error);
                    this.$alert('登录失败,请重试。', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });
                });
            }
        }
    }
</script>
<style>
.login-box {
    margin: 160px;
}
</style>

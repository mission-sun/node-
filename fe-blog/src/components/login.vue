<template>
  <div class="login-wrap">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input type="input" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <h1>{{ msg }}</h1>
    <input type="text" v-model="username">
    <input type="text" v-model="password">
    <button @click="userLongin">登录</button> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'login',
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {  required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' }
        ],
      }

    }
  },
  created() {
  },
  methods: {
     ...mapMutations({
      loginState: 'loginState' 
    }),
    userLongin() {
      const param = {
        username: this.username,
        password: this.password
      }
      this.$post("/api/user/login", param).then(res => {
        if(res.data.errno == 0) {
          this.loginState(true)
          this.$router.push({path: '/home/list'}).catch( err => {
          })
        }
      });
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post("/api/user/login", this.ruleForm).then(res => {
              if(res.data.errno == 0) {
                this.loginState(true)
                this.$router.push({path: '/home/list'}).catch( err => {
                })
              }
            });
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
  }

</script>

<style scoped lang='less'>
.login-wrap {
  width: 50%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

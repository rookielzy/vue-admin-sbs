<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isValidUsername } from '@/utils/validate'
import { login } from '@/api/login'

export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isValidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码长度必须大于5'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        username: 'admin',
        password: 'password'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      showLoading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.loginForm).then((res) => {
            console.log('logining --- ', res)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
      width: 400px;
      height: 300px;
      min-width: 300px;
    }
  }
</style>

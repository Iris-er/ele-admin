<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-form :model="loginForm" ref="ruleForm">
      <el-form-item label="手机号码">
        <el-input v-model="loginForm.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="logingout">退出登录</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import { login } from '@/api/user.js'
export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // },
  data () {
    return {
      loginForm: {
        phone: '',
        password: '',
        areaCode: 86
      }
    }
  },
  methods: {
    submit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log('大萨达')
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: '/about' })
          }).catch(() => {
            console.log('登录失败')
          })
        }
      })
    },
    logingout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  width: 40%;
  margin: 10px auto;
}
</style>

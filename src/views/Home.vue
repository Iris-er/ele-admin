<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-form :model="loginForm" ref="ruleForm">
      <el-form-item label="手机号码">
        <el-input v-model="loginForm.userName" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="logingout">退出登录</el-button> <i class="iconfont">&#xe656;</i><i class="iconfont iconjiaose"></i>
    <BaseInput v-model="loginValue" />
    <div>{{loginValue}}</div>
    <el-input v-model="obj.a" />
    <div>{{obj.a}}</div>
    <el-button @click="handleEvent">event和$event区别</el-button>
    <el-button @click="hanele(2, $event)">这是$event</el-button>
    <el-button @click="reload()">强制刷新组价</el-button>
    <router-link to="/menu">去导航页</router-link>
    <div class="test">修改公共样式</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import BaseInput from '@/components/BaseInput.vue'
// import { login } from '@/api/user.js'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    BaseInput: () => import('@/components/BaseInput.vue') // 异步组件，节省性能
  },
  data () {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginValue: '',
      obj: {
        a: 'asd'
      }
    }
  },
  watch: {
    obj: {
      handler (newName, oldName) {
        // console.log('obj.a changed', this)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    submit () {
      this.$router.push({ path: '/about', query: { id: 11 } })
      // this.$refs.ruleForm.validate((valid) => {
      //   if (valid) {
      //     this.$store.dispatch('user/login', this.loginForm).then(() => {
      //       this.$router.push({ path: '/about', query: { id: 11 } })
      //     }).catch(() => {
      //     })
      //   }
      // })
    },
    logingout () {
      this.$store.dispatch('user/logout')
    },
    toChild () {
      const a = 1
      // console.log(a)
      return a
    },
    handleEvent (event) {
      console.log('这是event', event, event.target)
    },
    hanele (val, event) {
      console.log('val:' + val, 'event:', event, event.target)
    },
    reload () {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  width: 40%;
  margin: 10px auto;
 /deep/ .test {
   color: pink;
  }
}
</style>

<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <m-form :model="loginForm" ref="ruleForm">
      <m-form-item label="手机号码">
        <m-input v-model="loginForm.userName" placeholder="请输入手机号码" />
      </m-form-item>
      <m-form-item label="密码">
        <m-input v-model="loginForm.password" placeholder="请输入手机号码" />
      </m-form-item>
      <m-form-item>
        <m-button type="primary" @click="submit">登录</m-button>
      </m-form-item>
    </m-form>
    <m-button @click="logingout">退出登录</m-button>
    <i class="iconfont">&#xe656;</i><i class="iconfont iconjiaose"></i>
    <BaseInput v-model="loginValue" />
    <div>{{ loginValue }}</div>
    <m-input v-model="obj.a" />
    <div>{{ obj.a }}</div>
    <m-button @click="handleEvent">event和$event区别</m-button>
    <m-button @click="hanele(2, $event)">这是$event</m-button>
    <m-button @click="reload()">强制刷新组价</m-button>
    <router-link to="/menu">去导航页</router-link>
    <div class="test">修改公共样式</div>
    <div class="mipoers">
      测试!important
      <div style="child">继承父组件属性</div>
    </div>
    <div class="outer"><div class="inner"></div></div>
    <div class="aside"></div>
    <div class="main"></div>
    <div class="container1">
      <div class="left">你好</div>
      <div class="right">我好</div>
    </div>
    <div class="container2">
      <div class="content">中间内容</div>
      <div class="left">左侧区域</div>
      <div class="right">右侧区域</div>
    </div>
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
.home {
  width: 40%;
  margin: 10px auto;
  /deep/ .test {
    color: pink;
  }
  .mipoers {
    --color: red !important;
    color: var(--color);
    color: blue;
    border: var(--b);
    --b: 2px solid salmon;
    .child {
      --b: inherit;
    }
  }
  .inner {
    width: 100px;
    overflow: hidden;
    background: blue;
  }

  .inner::after {
    content: "";
    margin-top: 100%;
    display: block;
  }
  .aside {
    height: 100px;
    width: 300px;
    float: right;
    background: yellow;
  }

  .main {
    height: 100px;
    background: aqua;
    margin-right: 300px;
  }
  .container1 {
    display: flex;
    height: 100px;
    .content {
      height: 100px;
      flex: 1 1;
      order: 2;
      background: #f00;
    }

    .left {
      height: 100px;
      float: left;
      width: 100%;
      background: pink;
    }

    .right {
      float: left;
      width: 300px;
      margin-left: -300px;
      background: #00f;
    }
  }
  .container2 {
    padding: 0 300px 0 200px;
    border: 1px solid black;
    height: 100px;
    .content {
      float: left;
      width: 100%;
      background: #f00;
    }

    .left {
      width: 200px;
      background: #0f0;
      float: left;
      margin-left: -100%;
      position: relative;
      left: -200px;
    }

    .right {
      width: 300px;
      background: #00f;
      float: left;
      margin-left: -300px;
      position: relative;
      right: -300px;
    }
  }
}
</style>

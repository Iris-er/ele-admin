<template>
  <div class="mui-flex">
    <div class="mui-menu">
      <div class="menu-content">
        <m-menu
        class="scrollbox mui-scrollbar"
        text-color="#8e8e93"
        router
        :collapse="isCollapse"
        :default-active="activeName"
      >
        <template v-for="lv1 of finalNav">
          <!-- id 属性给测试自动化使用 -->
          <!-- 一级导航 -->
          <m-submenu v-if="lv1.child" :key="lv1.id" :index="lv1.id">
            <template slot="title">
              <i :class="lv1.icon"></i>
              <span :id="'nv_' + lv1.power">{{ lv1.name }}</span>
            </template>

            <template v-for="lv2 of lv1.child">
              <!-- 二级导航 -->
              <m-submenu v-if="lv2.child" :key="lv2.id" :index="lv2.id">
                <template slot="title">
                  <i :class="lv2.icon"></i>
                  <span :id="'nv_' + lv2.power">{{ lv2.name }}</span>
                </template>

                <!-- 三级导航 -->
                <m-menu-item
                  v-for="lv3 of lv2.child"
                  :key="lv3.id"
                  :id="'nv_' + lv3.power"
                  :index="lv3.path">
                  {{ lv3.name }}
                </m-menu-item>
              </m-submenu>

              <m-menu-item v-else :key="lv2.id" :index="lv2.path" :id="'nv_' + lv2.power">
                <i :class="lv2.icon"></i>
                <span slot="title">{{ lv2.name }}</span>
              </m-menu-item>
            </template>
          </m-submenu>

          <m-menu-item v-else :key="lv1.id" :index="lv1.path" :id="'nv_' + lv1.power">
            <i :class="lv1.icon"></i>
            <span slot="title">{{ lv1.name }}</span>
          </m-menu-item>
        </template>
      </m-menu>
      </div>
      <div class="logout-content" :collapse="isCollapse">
        <m-menu>
          <m-menu-item>
            <i class="el-icon-setting"></i>
            <span slot="title">退出登录</span>
          </m-menu-item>
        </m-menu>
      </div>
    </div>
    <div class="container-flex">
      <div class="mui-header">这是header</div>
      <router-view />
    </div>
  </div>
</template>

<script>
import navCfg from './nav.config'
export default {
  data () {
    return {
      navCfg,
      finalNav: null,
      routes: []
    }
  },
  computed: {
    // 查找当前的页面路由是否在 routes 中有匹配，匹配到的话返回该项作为导航的激活项（高亮）
    activeName () {
      return this.routes.find(x => {
        if (x === '/') {
          if (this.$route.path === '/') {
            return x
          }
        } else if (this.$route.path.indexOf(x) === 0) {
          // 该判断条件是为了满足进入详情页之类的页面也能使导航高亮
          return x
        }
      })
    },
    powers () { return this.$store.state.auth.powers },
    user () { return this.$store.state.auth.user },
    isCollapse: {
      get () {
        return this.$store.state.foundation.prefer.navCollap
      },
      set (val) {
        this.$store.commit('UPDATE_PREFER', { navCollap: val })
      }
    },
    menuSwitchStatus: {
      get () {
        return !this.isCollapse // 取反是为了导航收起时使开关按钮显示平行状态
      },
      set (val) {
        this.isCollapse = !val // 取反是为了导航展开时使开关按钮显示交叉状态
      }
    }
  },
  created () {
    const cfg = this.generateNav()
    if (cfg) {
      this.finalNav = cfg.finalNav
      this.routes = cfg.routes
    }
  },
  methods: {
    logout () {
      this.$store.commit('CLEAN_USER')
      this.$store.commit('UPDATE_POWERS', {})
      this.$router.push({ name: 'login' })
      this.$koapi.request('auth.logout', {}, { autoHandleError: false })
    },
    // 根据服务端返回的权限数据与 nav.config 匹配生成导航
    generateNav () {
      const routes = []
      let id = 0
      // 即使 this.powers 为空也要给一个默认值 {}，
      // 以便下面遍历如期运行，至少会生成无需权限的导航项目
      const pws = this.powers || {}

      const deepReduce = (arr) => {
        return arr.reduce((x, y) => {
          if (y.power === 'dashboard_read' && !pws[y.power]) {
            y.any = 1
            y.path = '/welcome'
          }
          if (pws[y.power] || y.any) { // 先匹配一级导航，有权限再进入该导航的 child 属性
            y.id = id + '' // 增加 id 属性以便给 v-for 设置 key 和 menu-item 的 index
            id++
            y.path && routes.push(y.path) // 生产路由表，用于计算 activeName
            y.child && (y.child = deepReduce(y.child)) // 递归生成子路由
            x.push(y) // 累加有权限的一级导航
          }
          return x
        }, [])
      }

      const finalNav = deepReduce(this.navCfg)

      return { finalNav, routes }
    }
  }
}
</script>

<style lang="scss" src="@/assets/css/components/_top_left_frame.scss"></style>

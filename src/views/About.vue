<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { getGoods } from '@/api/user.js'
export default {
  name: 'about',
  created () {
    this.getPos()
  },
  methods: {
    getPos () {
      console.log(this.$store.getters)
      getGoods({ pageIndex: 1, pageSize: 10 }).then(res => {
        const { code, data } = res
        if (code === 0) {
          console.log(data)
        }
      }).catch(() => {
        console.log('获取失败')
      })
    }
  }
}
</script>

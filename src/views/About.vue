<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { getPowers } from '@/api/user.js'
export default {
  name: 'about',
  created () {
    this.getPos()
  },
  methods: {
    getPos () {
      getPowers().then(res => {
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

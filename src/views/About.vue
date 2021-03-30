<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { getGoods } from '@/api/user.js'
// import { aes } from '@/utils/encryption'
export default {
  name: 'about',
  props: ['id'],
  created () {
    this.getPos()
  },
  mounted () {
    console.log(1111, this.$route.query.id)
    // console.log('fsdggh', aes.en(JSON.stringify({ pageIndex: 1, pageSize: 10 })))
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
